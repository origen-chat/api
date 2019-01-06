export type RichText = Readonly<{
  blocks: ReadonlyArray<RichTextBlock>;
}>;

export type RichTextBlock = Readonly<{
  text: string;
}>;
