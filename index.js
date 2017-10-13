// @flow
import * as React from 'react'
import ReactDOM from 'react-dom'

class Item extends React.PureComponent<{href: string}> {
  render () {
    return <a href={this.props.href}>Test</a>
  }
}

class ItemGroup extends React.PureComponent<{}> {
  render () {
    return <div />
  }
}

type MenuChild = React.Element<typeof Item> | React.Element<typeof ItemGroup>

type Props = {
  children: React.ChildrenArray<MenuChild>
}

class Menu extends React.PureComponent<Props> {
  render () {
    return <div>
      {React.Children.map(
        this.props.children,
        item => React.cloneElement(item)
      )}
    </div>
  }
}

class App extends React.PureComponent<{}> {
  render () {
    return <Menu>
      <Item href='/test1' />
      <ItemGroup />
      <Item href='/test2' />
    </Menu>
  }
}

const appRoot = document.createElement('div')
document.body && document.body.appendChild(appRoot)

ReactDOM.render(<App />, appRoot)
