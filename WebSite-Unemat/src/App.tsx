// JSX = JavaScript + XML
import { SideNavBarLeft } from './components/SideNavBarLeft';
import { Dashboard } from './components/Dashboard';
import { Tcc } from './components/Tcc';
import { Projetos } from './components/Projetos';
import { Arquivos } from './components/Arquivos';
import { Midias } from './components/Midias';
import { Discord } from './components/Discord';
import { Footer } from './components/Footer';



import './global.css'
import styles from './App.module.css'






export function App() {
  return (
    <>
      <SideNavBarLeft />
      {/* <Dashboard /> */}
      {/* <Tcc /> */}
      {/* <Projetos /> */}
      {/* <Arquivos /> */}
      {/* <Midias /> */}
      {/* {<Discord />} */}
    </>
  )
}
