// import function module exemple
import functionModule from './modules/functionModule'

// import class module exemple
import ClassModule from './modules/ClassModule'

// import utility exemple
import { utility1, utility2 } from './utilities'

function init() {
  console.log("✅ COMMON JS LOADED")

  // use function module
  functionModule()

  // use class module
  const classModule = new ClassModule()
  classModule.classMethod()

  // use utility
  utility1()
  utility2()
}

// init when dom ready
document.addEventListener('DOMContentLoaded', init)