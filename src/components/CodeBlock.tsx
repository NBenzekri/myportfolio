import { codeToHtml } from "shiki";

export default async function CodeBlock({
  code,
  lang = "java",
}: {
  code: string;
  lang?: string;
}) {
  const html = await codeToHtml(code.trim(), {
    lang,
    theme: "night-owl",
    colorReplacements: { "#011627": "#10191d" },
  });

  return <div dangerouslySetInnerHTML={{ __html: html }} />;
}
