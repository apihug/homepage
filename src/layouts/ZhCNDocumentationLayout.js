import { SidebarLayout } from '@/layouts/SidebarLayout'
import { Title } from '@/components/Meta'
import { documentationNav } from '@/navs/zhCNdocumentation'

export function ZhCNDocumentationLayout(props) {
  return (
    <>
      <Title>{props.layoutProps.meta.metaTitle || props.layoutProps.meta.title}</Title>
      <SidebarLayout nav={documentationNav} {...props} />
    </>
  )
}

ZhCNDocumentationLayout.nav = documentationNav
