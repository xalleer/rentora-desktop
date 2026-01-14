<template>
  <div class="min-h-screen flex items-center justify-center p-4 font-sans bg-gray-50">
    <div class="w-full max-w-6xl bg-white rounded-[40px] shadow-xl overflow-hidden grid grid-cols-1 lg:grid-cols-2 min-h-[700px]">
      <div class="flex flex-col justify-center px-8 md:px-16 py-10">
        <slot />
      </div>

      <div class="hidden lg:block relative">
        <div class="absolute inset-0 flex items-center justify-center p-8">
          <img
            src="https://images.unsplash.com/photo-1459411552884-841db9b3cc2a?q=80&w=2449&auto=format&fit=crop"
            alt="Monstera leaves"
            class="w-full h-full object-cover rounded-[40px]"
          >
        </div>
      </div>
    </div>
  </div>
</template>
