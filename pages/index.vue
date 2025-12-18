<template>
  <div class="container">
    <header class="header">
      <h1>Witaj na moim blogu!</h1>
      <p class="subtitle">Miejsce, gdzie dzielę się wiedzą i doświadczeniem</p>
    </header>

    <main class="main">
      <section class="hero">
        <h2>📝 Najnowsze wpisy</h2>
        <div v-if="posts && posts.length > 0" class="posts-grid">
          <NuxtLink
            v-for="post in posts"
            :key="post._path"
            :to="post._path"
            class="post-card"
          >
            <h3>{{ post.title }}</h3>
            <p class="post-description">{{ post.description }}</p>
            <time class="post-date">{{ formatDate(post.date) }}</time>
          </NuxtLink>
        </div>
        <div v-else class="no-posts">
          <p>Wkrótce pojawią się tutaj pierwsze wpisy...</p>
        </div>
      </section>

      <section class="about">
        <h2>O blogu</h2>
        <p>
          Ten blog został zbudowany z wykorzystaniem Nuxt 3 i Nuxt Content,
          zoptymalizowany pod kątem Core Web Vitals dla najlepszej wydajności.
        </p>
      </section>
    </main>

    <footer class="footer">
      <p>&copy; 2025 Mój Blog. Wszystkie prawa zastrzeżone.</p>
    </footer>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Strona główna - Mój Blog',
  meta: [
    { name: 'description', content: 'Blog o programowaniu, technologii i najlepszych praktykach' }
  ]
})

const { data: posts } = await useAsyncData('posts', () =>
  queryContent('/blog')
    .sort({ date: -1 })
    .limit(6)
    .find()
)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 4rem 2rem;
  text-align: center;
}

.header h1 {
  font-size: 3rem;
  margin-bottom: 1rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.25rem;
  opacity: 0.95;
}

.main {
  flex: 1;
  max-width: 1200px;
  width: 100%;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.hero {
  margin-bottom: 4rem;
}

.hero h2 {
  font-size: 2rem;
  margin-bottom: 2rem;
  color: #2d3748;
}

.posts-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
}

.post-card {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  display: flex;
  flex-direction: column;
}

.post-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.post-card h3 {
  font-size: 1.5rem;
  margin-bottom: 0.75rem;
  color: #667eea;
}

.post-description {
  flex: 1;
  color: #718096;
  margin-bottom: 1rem;
}

.post-date {
  font-size: 0.875rem;
  color: #a0aec0;
}

.no-posts {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: #718096;
}

.about {
  background: white;
  padding: 2rem;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.about h2 {
  font-size: 1.75rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.about p {
  color: #718096;
  line-height: 1.8;
}

.footer {
  background: #2d3748;
  color: white;
  text-align: center;
  padding: 2rem;
  margin-top: auto;
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .posts-grid {
    grid-template-columns: 1fr;
  }
}
</style>
