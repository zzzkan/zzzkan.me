export const resource = {
  FeaturedImageAltText: "アイキャッチ画像",
  FeaturedImageLinkAltText: (pageName: string) =>
    `アイキャッチ画像 (${pageName})`,
  ToggleColorModeLabelText: "カラーモードを変更",
  AllPostsText: "All Posts",
  PreviousPageText: "前の記事",
  NextPageText: "次の記事",
  RelatedPostsText: "関連記事",
  PageCountText: (count: number) => `${count}ページ目`,
  TagPostsDescriptionText: (tagName: string) =>
    `${tagName}タグが付いた記事一覧`,
};
