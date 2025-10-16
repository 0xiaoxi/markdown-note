import { RootLayout, Sidebar, Content } from './components/AppLayout'

function App() {
  return (
    <>
      <RootLayout>
        <Sidebar className='p-2'></Sidebar>
        <Content>Content</Content>
      </RootLayout>
    </>
  )
}

export default App
