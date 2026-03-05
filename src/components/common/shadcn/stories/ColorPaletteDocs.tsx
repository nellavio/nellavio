import React from "react";

const SectionTitle = ({ children }: { children: React.ReactNode }) => (
  <h2 className="text-xl font-semibold text-primaryText mt-8 mb-3 border-b border-mainBorder pb-2">
    {children}
  </h2>
);

const Code = ({ children }: { children: React.ReactNode }) => (
  <code className="bg-secondaryBg text-coloredText px-1.5 py-0.5 rounded text-sm">
    {children}
  </code>
);

const CodeBlock = ({ children }: { children: React.ReactNode }) => (
  <pre className="bg-secondaryBg text-primaryText text-sm p-4 rounded-lg overflow-x-auto my-3 leading-relaxed">
    <code>{children}</code>
  </pre>
);

export const ColorPaletteDocs = () => (
  <div className="p-6 max-w-3xl">
    <h1 className="text-2xl font-bold text-primaryText mb-6">Color Palette</h1>
    <p className="text-primaryText leading-relaxed mb-3">
      Themes are powered by CSS custom properties (variables) and Tailwind
      v4&apos;s <Code>@theme</Code> directive.
    </p>
    <ul className="list-disc list-inside text-primaryText leading-relaxed space-y-1 ml-1">
      <li>
        <Code>light.css</Code> &mdash; defines default token values inside{" "}
        <Code>
          @theme {"{"} ... {"}"}
        </Code>
        , which also generates Tailwind utility classes
      </li>
      <li>
        <Code>dark.css</Code> &mdash; overrides the same variables inside a{" "}
        <Code>
          .dark {"{"} ... {"}"}
        </Code>{" "}
        selector
      </li>
    </ul>

    <SectionTitle>Usage in components</SectionTitle>
    <p className="text-primaryText leading-relaxed mb-3">
      Tailwind v4 automatically strips the <Code>--color-</Code> prefix and
      generates utility classes:
    </p>
    <CodeBlock>
      {`--color-primaryBg   →  bg-primaryBg
--color-coloredText →  text-coloredText`}
    </CodeBlock>
    <p className="text-primaryText leading-relaxed">
      You can use Tailwind classes directly &mdash; no need for{" "}
      <Code>{"var(--color-...)"}</Code> in component code. The only exception is
      inline <Code>style</Code> attributes or CSS files where Tailwind classes
      are not available. <br /> <br />
      Components never need <Code>dark:</Code> prefixes &mdash; one utility
      class works for both themes.
    </p>

    <SectionTitle>Token groups</SectionTitle>
    <ul className="list-disc list-inside text-primaryText leading-relaxed space-y-1 ml-1">
      <li>
        <strong>Texts</strong> &mdash; text colors for headings, labels, badges,
        navigation items, tabs
      </li>
      <li>
        <strong>Icons</strong> &mdash; fill colors for icons and decorative
        elements
      </li>
      <li>
        <strong>Backgrounds</strong> &mdash; surface colors for cards, buttons,
        inputs, modals, dropdowns, charts
      </li>
      <li>
        <strong>Borders</strong> &mdash; colors for dividers, inputs, focus
        rings, card outlines etc.
      </li>
    </ul>

    <SectionTitle>Adding a new token</SectionTitle>
    <ol className="list-decimal list-inside text-primaryText leading-relaxed space-y-1 ml-1">
      <li>
        Add the variable to <strong>both</strong> <Code>light.css</Code> and{" "}
        <Code>dark.css</Code>
      </li>
      <li>
        Place it in the correct existing group (Texts, Icons, Backgrounds, or
        Borders)
      </li>
      <li>
        RGB format is recommended for all values &mdash; e.g.{" "}
        <Code>rgb(59, 130, 246)</Code>
      </li>
      <li>
        Follow the naming convention: <Code>--color-{"{context}{Role}"}</Code>
      </li>
    </ol>
  </div>
);
