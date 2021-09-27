using Microsoft.AspNetCore.Http;
using senai_spmed_webAPI.Context;
using senai_spmed_webAPI.Domains;
using senai_spmed_webAPI.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_spmed_webAPI.Repositories
{
    public class UsuarioRepository : IUsuarioRepository
    {
        SPMedContext ctx = new SPMedContext();
        public string ConsultarPerfilBD(int idUsuario)
        {
            throw new NotImplementedException();
        }

        public string ConsultarPerfilDir(int idUsuario)
        {
            throw new NotImplementedException();
        }

        public Usuario Login(string email, string senha)
        {
            return ctx.Usuarios.FirstOrDefault(u => u.Email == email && u.Senha == senha);
        }

        public void SalvarPerfilBD(IFormFile foto, int idUsuario)
        {
            throw new NotImplementedException();
        }

        public void SalvarPerfilDir(IFormFile foto, int idUsuario)
        {
            throw new NotImplementedException();
        }
    }
}
