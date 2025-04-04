export function getCurrentPosition(options: PositionOptions = {}) {
  return new Promise<GeolocationPosition>((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      return reject(new Error('Geolocation is not supported by your browser.'))
    }

    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}
