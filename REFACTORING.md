# React & Next.js Best Practices - Portfolio V2

Este documento descreve as refatorações e otimizações aplicadas ao projeto seguindo as melhores práticas recomendadas pela Vercel.

## 📋 Resumo das Mudanças

### 1. Reorganização de Estrutura de Componentes (Domain-Based Organization)

**Antes:**
```
src/app/components/
├── Hero.tsx
├── ProjectCard.tsx
├── SkillsGrid.tsx
├── (todos os componentes no mesmo nível)
```

**Depois:**
```
src/app/components/
├── common/                          # Componentes reutilizáveis
│   ├── Section.tsx                 # Wrapper de seção
│   ├── SectionHeader.tsx           # Header consistente
│   ├── ViewAllLink.tsx             # Link de "ver mais"
│   └── index.ts
├── home/                            # Componentes específicos da página home
│   ├── Hero.tsx                    # Seção hero
│   ├── FeaturedProjectsSection.tsx # Seção de projetos
│   ├── SkillsSection.tsx           # Seção de skills
│   └── index.ts
├── projects/                        # Componentes do domínio projetos
│   ├── ProjectCard.tsx             # Card individual
│   └── index.ts
└── ui/                              # Componentes primitivos de UI
    ├── ButtonLink.tsx              # Link estilizado
    └── index.ts
```

**Benefícios:**
- Código mais organizado e fácil de navegar
- Clareza sobre responsabilidades de cada componente
- Facilita manutenção futura (novos componentes vão para seu domínio correspondente)

### 2. Memoização Correta (Vercel: rerender-memo)

**Antes:**
```typescript
export const Hero = () => {
  // Componente não memoizado
};
```

**Depois:**
```typescript
export const Hero = memo(({ greeting, title, ... }: HeroProps) => {
  return (/* JSX */);
});

Hero.displayName = 'Hero';
```

**Por que funciona:**
- `memo()` previne re-renders quando props não mudam
- displayName melhora debugging no React DevTools
- Essencial quando o componente é chamado frequentemente

**Aplicado em:**
- `Hero.tsx` - Evita re-render quando página pai re-renderiza
- `FeaturedProjectsSection.tsx` - Evita recalcular grid de projetos
- `SkillsSection.tsx` - Evita recalcular lista de skills
- `ProjectCard.tsx` - Evita re-render de cards individuais
- `TechBadge.tsx`, `SkillItem.tsx`, `SkillCategoryGroup.tsx` - Componentes filhos

### 3. Extração de Subcomponentes Memoizados

**Antes:**
```typescript
<div>
  {techStack.map((tech, index) => (
    <span key={tech} className="...">
      {tech}
    </span>
  ))}
</div>
```

**Depois:**
```typescript
const TechBadge = memo(({ tech, index }: TechBadgeProps) => (
  <span className="...">
    {tech}
  </span>
));

// Uso:
{techStack.map((tech, index) => (
  <TechBadge key={tech} tech={tech} index={index} />
))}
```

**Por que funciona:**
- Componentes pequenos e simples renderizam mais rápido
- Memoização funciona melhor em componentes focados
- Reutilização de código

**Aplicado em:**
- `TechBadge` dentro de `Hero`
- `SkillItem` e `SkillCategoryGroup` dentro de `SkillsSection`

### 4. Composição de Componentes (Compound Components Pattern)

**Antes:**
```typescript
// Toda lógica em um componente gigante
export default function Home() {
  return (
    <div>
      {/* Hero JSX */}
      <section className="...">
        {/* Seção de projetos JSX */}
      </section>
      <section className="...">
        {/* Seção de skills JSX */}
      </section>
    </div>
  );
}
```

**Depois:**
```typescript
export default function Home() {
  return (
    <div>
      <Hero {...props} />
      <FeaturedProjectsSection {...props} />
      <SkillsSection {...props} />
    </div>
  );
}
```

**Benefícios:**
- Código mais limpo e legível
- Cada componente tem responsabilidade clara
- Facilita testes unitários
- Componentes reutilizáveis em outras páginas

### 5. Componentes Base Reutilizáveis

**Criados:**
- `Section` - Wrapper para sections com padding e max-width
- `SectionHeader` - Header consistente (badge + título + descrição)
- `ViewAllLink` - Link "ver mais" com seta
- `ButtonLink` - Link estilizado como botão

**Benefícios:**
- DRY (Don't Repeat Yourself) - reduz duplicação
- Consistência visual garantida
- Fácil atualizar estilos globalmente
- Menos código nos componentes que usam

### 6. Type Safety Melhorada

**Antes:**
```typescript
export interface BlogMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}
```

**Depois:**
```typescript
/**
 * Blog post metadata without content
 *
 * Lightweight version of BlogPost used in lists.
 * Prevents loading full content for list views.
 *
 * @property slug - URL slug for the post
 * @property title - Post title
 * @property date - Publication date
 * @property excerpt - Short description
 * @property tags - Array of post tags
 */
export interface BlogMetadata {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  tags: string[];
}
```

**Benefícios:**
- Documentação inline (JSDocs)
- IDE autocompletar melhorado
- Reduz ambiguidade sobre responsabilidades
- Facilita onboarding de novos desenvolvedores

### 7. Props Bem Estruturadas

**Antes:**
```typescript
<Hero /> // Props hardcoded dentro do componente
```

**Depois:**
```typescript
<Hero
  greeting={t.hero.greeting}
  title={t.hero.title}
  description={t.hero.description}
  ctaPrimary={t.hero.cta}
  ctaSecondary={t.hero.ctaSecondary}
  primaryHref={getLocalizedLink('/projects')}
  secondaryHref={getLocalizedLink('/about')}
  techStack={[...HOME_TECH_STACK]}
/>
```

**Benefícios:**
- Componentes puramente funcionais (sem side effects)
- 100% reutilizáveis em diferentes contextos
- Fácil de testar (sem mocks complexos)
- Mensagem clara de quais dados o componente precisa

## 🚀 Performance Optimizations (Vercel Best Practices)

### Eliminando Recálculos Desnecessários

**Antes:**
```typescript
const skills = getHomeSkills(language); // Recalcula sempre
```

**Depois:**
```typescript
const skills = useMemo(
  () => getHomeSkills(language as 'en' | 'pt'),
  [language],
);
```

**Impacto:** Reduz recalculos de dados quando página re-renderiza sem mudança de idioma.

### Direct Imports (Bundle Size)

**Antes:**
```typescript
import * from '@/components'; // Carrega tudo (barrel import)
```

**Depois:**
```typescript
import { Hero } from '@/components/home/Hero';
import { FeaturedProjectsSection } from '@/components/home/FeaturedProjectsSection';
```

**Impacto:** Melhora tree-shaking, reduz bundle size.

### Memoização de Componentes Renderizados

```typescript
<div className="grid">
  {projects.map((project) => (
    <ProjectCard key={project.id} project={project} />
  ))}
</div>
```

O `ProjectCard` é memoizado, então:
- Se um projeto muda, apenas aquele card re-renderiza
- Se lista reordena, cards não re-renderizam desnecessariamente

## 📁 Nova Estrutura de Arquivos

```
src/app/
├── [lang]/
│   ├── page.tsx                    # Home page (refatorada, mais limpa)
│   ├── about/
│   ├── blog/
│   ├── projects/
│   └── links/
├── components/
│   ├── common/                     # Shared components
│   ├── home/                       # Home page specific
│   ├── projects/                   # Projects domain
│   ├── ui/                         # UI primitives
│   ├── Navigation.tsx              # (mantido no root por agora)
│   ├── Header.tsx
│   ├── Footer.tsx
│   └── ... (outros)
├── lib/
│   ├── home-config.ts             # NEW: Config para página home
│   ├── projects-data.ts
│   ├── shared-data.ts
│   └── ...
└── types/
    └── portfolio.ts               # Melhorado com documentação
```

## ✅ Checklist de Best Practices Aplicadas

### Rendering & Performance
- ✅ Memoização adequada de componentes (Vercel: rerender-memo)
- ✅ Extração de subcomponentes para otimizar re-renders
- ✅ useMemo para derived state (Vercel: rerender-dependencies)
- ✅ Direct imports em vez de barrel files (Vercel: bundle-barrel-imports)

### Component Architecture
- ✅ Componentes pequenos e focados
- ✅ Composição ao invés de deep nesting
- ✅ Props bem definidas (no hardcoding)
- ✅ displayName para debugging

### Type Safety
- ✅ Interfaces documentadas com JSDoc
- ✅ Props interfaces explícitas
- ✅ Evitar implicit any
- ✅ Tipos específicos (não string genéricos)

### Code Quality
- ✅ Biome auto-formatting (linter + formatter)
- ✅ Consistent naming conventions
- ✅ Clear separation of concerns
- ✅ Reusable component base (Section, SectionHeader, etc)

## 🔄 Próximos Passos (Futuras Otimizações)

1. **Lazy Loading de Componentes Pesados**
   ```typescript
   const HeavyComponent = dynamic(() => import('./Heavy'), { 
     loading: () => <Skeleton /> 
   });
   ```

2. **Image Optimization**
   - Usar Next.js `Image` component ao invés de `img`
   - WebP format com fallback

3. **Code Splitting**
   - Separar código de páginas específicas do core bundle
   - Prefetch inteligente em links

4. **React Server Components**
   - Fazer mais páginas como Server Components
   - Carregar dados no servidor quando possível

5. **Suspense Boundaries**
   - Implementar streaming progressivo de conteúdo
   - Reduzir Time to First Byte

## 📚 Referências

- [Vercel React Best Practices](https://vercel.com/guides/improving-performance-with-react)
- [React.memo Documentation](https://react.dev/reference/react/memo)
- [Next.js Performance Optimization](https://nextjs.org/docs/app/building-your-application/optimizing)
- [Web Performance APIs](https://developer.mozilla.org/en-US/docs/Web/API/Performance)
