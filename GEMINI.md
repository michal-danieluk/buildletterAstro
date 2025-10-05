-----

# GEMINI.md - Specyfikacja Bloga Opartego na Markdown (Astro + Tailwind CSS)

## 1\. Wybór Technologii i Cel Projektu

| Komponent | Technologia | Cel |
| :--- | :--- | :--- |
| **Generator Stron Statycznych** | **Astro** | Optymalna wydajność i SEO (domyślnie zero JS), modułowa praca z Markdown. |
| **Stylizacja** | **Tailwind CSS** | Spójny i szybki design. Użycie utility classes eliminuje problemy ze stylem. |
| **Hosting** | **GitHub Pages** | Automatyczne wdrożenie (CI/CD) na GitHub Pages z docelową własną domeną (adres do ustalenia). |
| **Treść** | **Markdown (.md)** | Proste, przenośne pisanie w terminalu. |
| **Wdrożenie** | **Pliki Markdown + Git** | Utrzymanie niskiego kosztu i braku skomplikowanego backendu (jak w WordPress). |

-----

## 2\. Struktura Danych (Markdown Frontmatter)

Wszystkie posty muszą znajdować się w katalogu `src/content/blog/`. Każdy plik `.md` musi zawierać następujące pola w sekcji **Frontmatter** (między `---`):

```markdown
---
layout: ../../layouts/PostLayout.astro  # Wymagany układ dla pojedynczego wpisu
title: Tytuł mojego wpisu (dla H1 i <title>)
description: Krótki, unikalny opis (max. 160 znaków dla SEO)
date: YYYY-MM-DDTHH:MM:SSZ       # Data i czas publikacji (kluczowe dla sortowania)
author: Twoje Imię i Nazwisko
image: /assets/images/post-hero.jpg # Ścieżka do obrazka wyróżniającego (opcjonalnie)
tags: ["technologia", "programowanie"] # Lista tagów/kategorii (kluczowa dla stron zbiorczych)
featured: true                     # Używane dla sekcji 'Wyróżnione' na stronie głównej
keywords: keywordsy dla SEO jeśli są
---
```

-----

## 3\. Elementy Globalne (BaseLayout)

Wszystkie strony muszą używać wspólnego **BaseLayout**, który zapewni spójność i optymalizację SEO.

### A. Nagłówek (Header - Komponent `Header.astro`)

  * **Logo/Nazwa Bloga:** W lewym rogu, link do Strony Głównej (`/`).
  * **Nawigacja:** Lista linków stylizowana za pomocą Tailwind CSS:
      * **Blog** (`/blog`)
      * **O Mnie** (`/about`)
    * **Przełącznik Motywu (Dark/Light Mode):** Wymagany, łatwo dostępny przełącznik.
  * **Paleta Kolorów:**
      * **Motyw Ciemny:** Tła w odcieniach szarości/granatu.
      * **Motyw Jasny:** Analogiczne jasne tła.
      * **Kolor Akcentujący:** Odcienie zbliżone do pomarańczowego.

### B. Stopka (Footer - Komponent `Footer.astro`)

  * Tło w kontrastowym kolorze (np. `bg-gray-800`).
  * Linki prawne/informacyjne.
  * Automatycznie generowane linki do **Sitemap** i **RSS Feed** (kluczowe dla AI/SEO).
  * Informacja o prawach autorskich: `© 2024-2025 [Twoja nazwa]. Wszelkie prawa zastrzeżone.`

-----

## 4\. Wymagane Widoki i Funkcjonalność

### A. Strona Główna (`/`)

1.  **Hero Section:** Duży, responsywny nagłówek z głównym hasłem bloga (np. H1).
2.  **Wyróżnione Wpisy (Featured):** Sekcja filtrująca posty z `featured: true`. Prezentowane jako atrakcyjna siatka **3-4 kart**.
3.  **Najnowsze Wpisy:** Lista **5 najnowszych** postów (tytuł, krótki opis, data).
4.  **CTA na Newsletter (Substack):**
      * Wyraźnie widoczny, zachęcający blok (np. w kolorze akcentującym).
      * Zawiera osadzony formularz **Substack** (lub innej usługi) do bezpośredniego zapisu.

### B. Strona Bloga - Lista Wpisów (`/blog`)

  * **Lista Wpisów:** Wyświetla wszystkie posty (z wyjątkiem ewentualnych szkiców).
  * **Sortowanie:** Zawsze sortowane malejąco wg `date`.
  * **Paginacja:** Wdrożenie paginacji (np. 10 postów na stronę), automatycznie obsługiwane przez Astro.
  * **Karty Postów:** Każdy post wyświetlony w atrakcyjnej karcie z miniaturowym obrazkiem, tytułem, datą i tagami.

### C. Strona Posta (Single Post) (`/blog/[slug]`)

  * **Layout:** Używa `PostLayout.astro` (zawiera `BaseLayout` i logikę treści).
  * **Treść:** W pełni wyrenderowana treść z Markdown.
  * **Elementy Meta:** Widoczny Tytuł (H1), Autor, Data, Podlinkowane Tagi.
  * **Spis Treści (TOC):** Opcjonalnie, ale zalecane: automatycznie generowany spis treści dla długich postów.
  * **CTA na Newsletter:** Powtórzenie bloku zapisu na Newsletter bezpośrednio na końcu treści posta.

### D. Strony Tagi/Kategorie (`/tags/[tag]`)

  * **Dynamiczne Generowanie:** Strony generowane przez Astro dla każdego unikalnego tagu (np. `/tags/astro`).
  * **Nagłówek:** Tytuł strony (np. "Artykuły z tagiem: [Nazwa Taga]").
  * **Lista:** Lista wszystkich postów przypisanych do tego tagu, z użyciem tych samych kart, co na `/blog`.

### E. Strona O Mnie (`/about`)

  * Statyczna strona Markdown/Astro z Twoją biografią i misją bloga.

-----

## 5\. Optymalizacja (SEO i AI Readiness)

1.  **Metadane:** W BaseLayout i PostLayout obowiązkowe użycie komponentów SEO (np. `AstroSeo`) do dynamicznego generowania tagów `<title>`, `<meta name="description">` oraz tagów **Open Graph (OG)** dla podglądów w mediach społecznościowych.
2.  **Schema Markup:** W PostLayout wdrożenie **JSON-LD Schema Markup** typu `BlogPosting` lub `Article` (zawierających autora, datę, obrazek, treść), aby pomóc AI i wyszukiwarkom w indeksowaniu.
3.  **Wydajność:** Astro zapewnia to domyślnie. Wymagane użycie zoptymalizowanych formatów obrazów i prawidłowe ładowanie asynchroniczne (np. `loading="lazy"`).
4.  **Dostępność:** Poprawna struktura nagłówków (jeden H1 na stronę, sekwencyjne H2, H3, itd.) oraz atrybuty `alt` dla wszystkich obrazów.
