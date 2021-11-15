import React from 'react';
import ReactDOM from 'react-dom';
import {  Route, BrowserRouter as Router, Redirect, Switch } from 'react-router-dom';

import './index.css';

import Home from './pages/home/home.jsx';
import Login from './pages/login/login';
import NotFound from './pages/notFound/notFound';
import ConsultasAdm from './pages/consultas/consultasAdm';
import ConsultasPaciente from './pages/consultas/consultasPaciente';
import ConsultasMedico from './pages/consultas/consultasMedico';

import reportWebVitals from './reportWebVitals';

import { parseJWT, usuarioAutenticado } from './services/auth';

const PermissaoAdm = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJWT().role === '1' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoMedico = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJWT().role === '2' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);

const PermissaoPaciente = ({ component: Component }) => (
  <Route
    render={(props) =>
      usuarioAutenticado() && parseJWT().role === '3' ? (
        // operador spread
        <Component {...props} />
      ) : (
        <Redirect to="login" />
      )
    }
  />
);


const routing = (
  <Router>
    <div>
      <Switch>
        <Route exact path="/" component={Home} /> {/* Home */}
        <Route path="/login" component={Login} />
        <PermissaoAdm path="/consultasAdm" component={ConsultasAdm}/>
        <PermissaoMedico path="/consultasMedico" component={ConsultasMedico} />
        <PermissaoPaciente path="/consultasPaciente" component={ConsultasPaciente} />
        <Route path="/notFound" component={NotFound} /> {/* NotFound*/}
        <Redirect to="/notFound" /> {/* Redireciona para notfound caso não encontre nenhuma rota*/}
      </Switch>
    </div>
  </Router>
)

ReactDOM.render(  
  routing,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
