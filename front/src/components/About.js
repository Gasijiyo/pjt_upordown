import { Navbar } from "./Navbar"
import "../App.css"

export const About = () => {
  return (
    <>
      <div className="Nav">
          <Navbar/>
      </div>
      <div>
          <p>우리가 사용한 모델은</p>
          <p>영국에서부터 시작하여..</p>
      </div>
    </>
  )
}