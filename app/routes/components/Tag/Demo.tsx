import { Tag } from "src/components/Tag";

export function Demo() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag>React</Tag>
        <Tag>TypeScript</Tag>
        <Tag>JavaScript</Tag>
        <Tag>CSS</Tag>
        <Tag>HTML</Tag>
      </div>
      
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag color="red">Frontend</Tag>
        <Tag color="green">Backend</Tag>
        <Tag color="yellow">Full Stack</Tag>
      </div>
      
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
        <Tag height="1rem">New</Tag>
        <Tag height="1.25rem">Popular</Tag>
        <Tag height="1.5rem">Featured</Tag>
        <Tag height="1.75rem">Recommended</Tag>
      </div>
    </div>
  );
}