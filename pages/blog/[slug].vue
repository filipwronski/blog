<template>
  <div class="container">
    <article v-if="post" class="article">
      <header class="article-header">
        <h1>{{ post.title }}</h1>
        <div class="meta">
          <time>{{ formatDate(post.date) }}</time>
        </div>
      </header>

      <ContentRenderer :value="post" class="article-content" />

      <footer class="article-footer">
        <NuxtLink to="/" class="back-link">← Powrót do strony głównej</NuxtLink>
      </footer>
    </article>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const { data: post } = await useAsyncData(`blog-${route.params.slug}`, () =>
  queryContent(`/blog/${route.params.slug}`).findOne()
)

if (!post.value) {
  throw createError({ statusCode: 404, message: 'Post nie został znaleziony' })
}

useHead({
  title: post.value.title,
  meta: [{ name: 'description', content: post.value.description }],
})

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
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
}

.article {
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.article-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 3rem 2rem;
}

.article-header h1 {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  line-height: 1.2;
}

.meta {
  opacity: 0.9;
  font-size: 0.95rem;
}

.article-content {
  padding: 2rem;
}

.article-footer {
  padding: 2rem;
  border-top: 1px solid #e2e8f0;
}

.back-link {
  display: inline-block;
  color: #667eea;
  text-decoration: none;
  font-weight: 500;
  transition: color 0.2s;
}

.back-link:hover {
  color: #764ba2;
}

@media (max-width: 768px) {
  .container {
    padding: 1rem;
  }

  .article-header h1 {
    font-size: 1.75rem;
  }

  .article-content {
    padding: 1.5rem;
  }
}
</style>

<style>
/* Global styles for content */
.article-content h2 {
  font-size: 1.75rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  color: #2d3748;
}

.article-content h3 {
  font-size: 1.5rem;
  margin-top: 1.5rem;
  margin-bottom: 0.75rem;
  color: #2d3748;
}

.article-content p {
  margin-bottom: 1rem;
  line-height: 1.8;
  color: #4a5568;
}

.article-content a {
  color: #667eea;
  text-decoration: underline;
}

.article-content code {
  background: #f7fafc;
  padding: 0.2rem 0.4rem;
  border-radius: 4px;
  font-size: 0.9em;
  font-family: 'Courier New', monospace;
}

.article-content pre {
  background: #2d3748;
  color: #fff;
  padding: 1.5rem;
  border-radius: 8px;
  overflow-x: auto;
  margin: 1.5rem 0;
}

.article-content pre code {
  background: none;
  padding: 0;
  color: inherit;
}

.article-content ul,
.article-content ol {
  margin-left: 2rem;
  margin-bottom: 1rem;
}

.article-content li {
  margin-bottom: 0.5rem;
  line-height: 1.8;
}

.article-content blockquote {
  border-left: 4px solid #667eea;
  padding-left: 1rem;
  margin: 1.5rem 0;
  color: #718096;
  font-style: italic;
}
</style>
