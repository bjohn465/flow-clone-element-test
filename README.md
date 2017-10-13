# Testing Flow with React.cloneElement

## The Setup

Suppose you have a `Menu` React Component that can only have `Item` or `ItemGroup` Components as children.

```javascript
type MenuChild = React.Element<typeof Item> | React.Element<typeof ItemGroup>

type Props = {
  children: React.ChildrenArray<MenuChild>
}

class Menu extends React.PureComponent<Props> {
  // ...
}
```

`Item` and `ItemGroup` accept different properties.

```javascript
class Item extends React.PureComponent<{href: string}> {
  // ...
}

class ItemGroup extends React.PureComponent<{}> {
  // ...
}
```

When rendering, `Menu` uses `React.cloneElement` on each of the children.

```javascript
render () {
  return <div>
    {React.Children.map(
      this.props.children,
      item => React.cloneElement(item)
    )}
  </div>
}
```

You can see the complete code in [`index.js`](./index.js).

## The Problem

Flow seems to have a problem when `React.cloneElement` is used on components that accept different props. I'm not sure why.

Here's a sample error (different versions of Flow will give different errors):

```
Error: index.js:28
 28:         item => React.cloneElement(item)
                     ^^^^^^^^^^^^^^^^^^^^^^^^ call of method `cloneElement`
  5: class Item extends React.PureComponent<{href: string}> {
                                            ^^^^^^^^^^^^^^ property `href`. Property not found in
 11: class ItemGroup extends React.PureComponent<{}> {
                                                 ^^ object type
```

## Try it yourself

1. Clone the repository
2. `yarn install`
3. `yarn flow`
