<template>
  <div class="container">
    <header class="header">
      <h1>Wszystkie wpisy</h1>
      <p class="subtitle">Pełna lista artykułów blogowych</p>
    </header>

    <main class="main">
      <div v-if="posts && posts.length > 0" class="posts-list">
        <article v-for="post in posts" :key="post._path" class="post-item">
          <NuxtLink :to="post._path" class="post-link">
            <h2>{{ post.title }}</h2>
            <p class="post-description">{{ post.description }}</p>
            <div class="post-meta">
              <time>{{ formatDate(post.date) }}</time>
            </div>
          </NuxtLink>
        </article>
      </div>
      <div v-else class="no-posts">
        <p>Brak postów do wyświetlenia</p>
      </div>

      <div class="back-link-container">
        <NuxtLink to="/" class="back-link">← Powrót do strony głównej</NuxtLink>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: 'Wszystkie wpisy - Mój Blog',
  meta: [{ name: 'description', content: 'Pełna lista wszystkich artykułów blogowych' }],
})

const { data: posts } = await useAsyncData('all-posts', () =>
  queryContent('/blog').sort({ date: -1 }).find()
)

const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('pl-PL', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })
}
</script>

<style scoped>
.container {
  min-height: 100vh;
  background: #f5f5f5;
}

.header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
  text-align: center;
}

.header h1 {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-weight: 700;
}

.subtitle {
  font-size: 1.1rem;
  opacity: 0.95;
}

.main {
  max-width: 900px;
  margin: 0 auto;
  padding: 3rem 2rem;
}

.posts-list {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 3rem;
}

.post-item {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.2s,
    box-shadow 0.2s;
}

.post-item:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.post-link {
  display: block;
  padding: 2rem;
  text-decoration: none;
  color: inherit;
}

.post-link h2 {
  font-size: 1.75rem;
  margin-bottom: 0.75rem;
  color: #667eea;
  transition: color 0.2s;
}

.post-link:hover h2 {
  color: #764ba2;
}

.post-description {
  color: #718096;
  margin-bottom: 1rem;
  line-height: 1.6;
}

.post-meta {
  display: flex;
  align-items: center;
  color: #a0aec0;
  font-size: 0.9rem;
}

.no-posts {
  text-align: center;
  padding: 3rem;
  background: white;
  border-radius: 12px;
  color: #718096;
}

.back-link-container {
  text-align: center;
  padding-top: 2rem;
}

.back-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  padding: 0.75rem 1.5rem;
  background: white;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  transition: all 0.2s;
}

.back-link:hover {
  color: #764ba2;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .header h1 {
    font-size: 2rem;
  }

  .post-link {
    padding: 1.5rem;
  }

  .post-link h2 {
    font-size: 1.5rem;
  }
}
</style>
