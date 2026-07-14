<template>
  <div class="flex min-h-screen flex-col bg-ink-950">
    <AppHeader />
    <main class="flex-1 pt-16">
      <slot />
    </main>
    <AppFooter />
    <FloatingContactDock />
  </div>
</template>
