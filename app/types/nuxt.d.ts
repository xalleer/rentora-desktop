declare module '#app' {
  interface NuxtApp {
    $api: ReturnType<typeof import('axios').default.create>
  }
}
