---
title: Niri - um tiling baseado em scroll
description: Niri WM traz o conceito de scrollable tiling, janelas organizadas com navegação fluida, mantendo foco e produtividade.
date: '2025-11-02'
categories:
  - NiriWM
  - Linux
  - Window Managers
published: true
---

## Introdução ao Niri Scrollable Tiling

**Niri** é um compositor **Wayland** que organiza janelas em um layout que se estende horizontalmente infinitamente. Ao abrir nova janela, as existentes **nunca são redimensionadas** - você apenas rola horizontalmente para acessá-las.

Isso permite navegação fluida através de **atalhos de teclado**, mantendo **foco e produtividade**. Escrito em **Rust**, o projeto é promissor e bem mantido.

**Links:**
- [Niri WM no GitHub](https://github.com/YaLTeR/niri)
- [Documentação oficial](https://yalter.github.io/niri/Configuration%3A-Introduction.html)

---

## O que diferencia Niri de outros window managers?

O destaque do Niri é o **"scrollable tiling"** - um modelo onde o layout não é limitado por grade fixa, mas por sequência rolável de colunas. Isso muda completamente a experiência de multitarefa: você pode manter várias janelas abertas "fora da tela", sem bagunçar o layout atual.

![Niri WM mostrando layout scrollable com janelas organizadas horizontalmente](/images/posts/niri/niri-hero.webp)

> A janela do Zed está à direita fora da tela, mas acessível via scroll horizontal.

### Comparação com Hyprland

**Hyprland** redistribui espaço entre todas as janelas abertas ao abrir uma nova, causando **redimensionamentos indesejados** e perda de foco.

**Niri** mantém tamanhos originais das janelas - você apenas rola horizontalmente para acessar adicionais, proporcionando **experiência mais fluida e focada**.

![Comparação do Hyprland mostrando redimensionamento automático de janelas](/images/posts/niri/hyprland-exemplo.webp)

> Hyprland redimensiona todas as janelas para caber na tela.

### **O que muda comparando com o hyprland?**

No **hyprland**, ao abrir uma nova janela, o espaço disponível é redistribuído entre todas as janelas abertas, o que pode levar a redimensionamentos indesejados e perda de foco. <br />
No **Niri**, as janelas mantêm seus tamanhos originais, e você pode rolar horizontalmente para acessar janelas adicionais, proporcionando uma experiência mais fluida e focada. <br />

![Comparação do Hyprland mostrando redimensionamento automático de janelas](/images/posts/niri/hyprland-exemplo.webp)

> No hyprland, ele redimensiona todas as janelas para caber na tela

<br />

## Features principais do Niri

- **Scrollable tiling** - Construído do zero com esse conceito em mente
- **Workspaces dinâmicos** - Crie e organize áreas de trabalho conforme necessário
- **Window overview** - Visualize todas janelas abertas e workspaces
- **Window grouping** - Agrupe janelas em abas
- **Configuração dinâmica** - Recarregamento de config sem reiniciar
- **Gestos** - Suporte a touchpad e mouse gestures

### Experimentar scrollable tiling

Se não quer instalar Niri ainda, existem implementações parciais para outros ambientes:

- **PaperWM** - Extensão para GNOME
- **Karousel** - Extensão para KDE Plasma
- **PaperWM.spoon** - Para macOS

> Essas implementações são parciais, podem não ser tão polidas, mas são ótimas para testar o conceito.

## Configuração do Niri

![Niri Overview mostrando janelas abertas e áreas de trabalho organizadas](/images/posts/niri/overview.webp)

> Overview mostrando janelas abertas e organizadas em workspaces.

Configuração é via arquivo **.kdl (Kotlin Data Language)** - simples e direto. A estrutura básica inclui seções para **atalhos**, **comportamento de janelas** e **preferências**.

```kdl
input { ... }
output "nome-do-monitor" { ... }
layout { ... }
spawn-at-startup "comando"
hotkey-overlay { ... }
prefer-no-csd
screenshot-path "..."
animations { ... }
window-rule { ... }
binds { ... }
```

## Considerações finais

Niri é projeto promissor que traz workflow diferente para tiling window managers. Vale experimentar se você curte esse universo. A curva de aprendizado é baixa e documentação é clara.
