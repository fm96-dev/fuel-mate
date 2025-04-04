export function useAsyncFn<R = void, P extends unknown[] = unknown[]>(
  callback: (...params: P) => Promise<R>,
) {
  const loading = ref(false)

  async function run(...params: P): Promise<R | undefined> {
    if (loading.value) return

    try {
      loading.value = true
      return await callback(...params)
    } finally {
      loading.value = false
    }
  }

  return {
    loading: readonly(loading),
    run,
  }
}
