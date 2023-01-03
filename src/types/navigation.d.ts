interface INavigationItem
{
    title: string;
    icon?: string;
    href?: string;
    items?: ReadonlyArray<INavigationItem>;
}
