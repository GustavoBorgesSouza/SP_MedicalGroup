using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using senai_spmed_webAPI.Domains;
using senai_spmed_webAPI.Interfaces;
using senai_spmed_webAPI.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace senai_spmed_webAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ClinicasController : ControllerBase
    {
        private IClinicaRepository _clinicaRepository { get; set; }

        public ClinicasController()
        {
            _clinicaRepository = new ClinicaRepository();
        }

        /// <summary>
        /// Lista todas as clinicas
        /// </summary>
        /// <returns>uma lista de clinicas</returns>
        [Authorize(Roles ="1")]
        [HttpGet]
        public IActionResult ListarTodas()
        {
            try
            {
                return Ok(_clinicaRepository.ListarTodos());
            }
            catch (Exception erro)
            {
                return BadRequest(erro);
            }
        }

        /// <summary>
        /// Busca uma clinica pelo id
        /// </summary>
        /// <param name="idClinica">id da clinica a ser procurada</param>
        /// <returns>Uma clinica</returns>
        [Authorize(Roles = "1")]
        [HttpGet("{idClinica}")]
        public IActionResult BuscarPorId(int idClinica)
        {
            try
            {
                Clinica clinicaBuscada = _clinicaRepository.BuscarPorId(idClinica);

                if (clinicaBuscada != null)
                {
                    return Ok(clinicaBuscada);
                }

                return BadRequest("A clinica requisitada não existe");

            }
            catch (Exception erro)
            {
               return BadRequest(erro);
            }

        }
    }
}
