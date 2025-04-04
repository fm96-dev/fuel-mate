import type { Ref } from 'vue'
import { useAsyncFn } from './useAsyncFn'

describe('useAsyncFn', () => {
  test('should handle successful async operation', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const { loading, run } = useAsyncFn(mockFn)

    expect(loading.value).toBe(false)

    const promise = run()
    expect(loading.value).toBe(true)

    await expect(promise).resolves.toBe('success')
    expect(loading.value).toBe(false)
    expect(mockFn).toHaveBeenCalledOnce()
  })

  test('should handle errors while keeping loading state consistent', async () => {
    const error = new Error('Test error')
    const mockFn = vi.fn().mockRejectedValue(error)
    const { loading, run } = useAsyncFn(mockFn)

    expect(loading.value).toBe(false)

    const promise = run()
    expect(loading.value).toBe(true)

    await expect(promise).rejects.toThrow('Test error')
    expect(loading.value).toBe(false)
  })

  test('should pass parameters correctly', async () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const { run } = useAsyncFn(mockFn)

    await run('param1', 123)
    expect(mockFn).toHaveBeenCalledWith('param1', 123)
  })

  test('should prevent concurrent executions', async () => {
    const mockFn = vi
      .fn()
      .mockImplementation(() => new Promise((resolve) => setTimeout(() => resolve('success'), 100)))
    const { loading, run } = useAsyncFn(mockFn)

    const promise1 = run()
    const promise2 = run()

    expect(loading.value).toBe(true)

    await expect(promise2).resolves.toBeUndefined()
    await expect(promise1).resolves.toBe('success')

    expect(mockFn).toHaveBeenCalledOnce()
  })

  test('loading should be readonly', () => {
    const mockFn = vi.fn().mockResolvedValue('success')
    const { loading } = useAsyncFn(mockFn)

    expectTypeOf(loading).toEqualTypeOf<Readonly<Ref<boolean>>>()
  })
})
