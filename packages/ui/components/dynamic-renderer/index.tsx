import React from 'react';
import * as DesignSystem from '@digdir/designsystemet-react';

interface ComponentNode {
  component: keyof typeof DesignSystem;
  props?: { [key: string]: any };
  children?: ComponentNode[];
}

interface DynamicRendererProps {
  node: ComponentNode;
}

export const DynamicRenderer: React.FC<DynamicRendererProps> = ({ node }) => {
  if (!node || !node.component) {
    return null;
  }

  const Component = DesignSystem[node.component];

  if (!Component) {
    console.error(`Component not found in design system: ${node.component}`);
    return <div>{`Error: Component '${node.component}' not found.`}</div>;
  }

  const children = node.children?.map((childNode, index) => (
    <DynamicRenderer key={index} node={childNode} />
  ));

  return React.createElement(Component, node.props, children);
};