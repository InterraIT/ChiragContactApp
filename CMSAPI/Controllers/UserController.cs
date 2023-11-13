using CMS_API.Interfaces;
using CMS_API.Modal;
using CMS_API.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.RazorPages;
using System.Collections.Generic;

namespace CMS_API.Controllers
{
    [Route("api/user")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserService _userService;

        public UserController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public async Task<IActionResult> GetUser(int pageNumber, int pageSize, string? searchTerm="" )
        {
            try
            {
                var users = await _userService.GetUsers();
                var filteredUsers = string.IsNullOrWhiteSpace(searchTerm)
                ? users
                : users.Where(u => u.firstName.ToLower().Contains(searchTerm.ToLower()) || u.lastName.ToLower().Contains(searchTerm.ToLower()) || u.email.ToLower().Contains(searchTerm.ToLower())).ToList();

                var totalUsers = filteredUsers.Count;
                var totalPages = (int)Math.Ceiling((double)totalUsers / pageSize);
                var paginatedUsers = filteredUsers.Skip((pageNumber - 1) * pageSize).Take(pageSize).ToList();



                return Ok(new { users = paginatedUsers, totalCount = totalUsers, currentPageNumber = pageNumber });
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
            
        }

        [HttpPost]
        public async Task<IActionResult> PostUser(UserContact user)
        {
            try
            {
                var users = await _userService.PostUser(user);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpDelete]
        public async Task<IActionResult> DeleteUser(int id)
        {
            try
            {
                var users = await _userService.DeleteUser(id);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }

        [HttpPost("edit")]
        public async Task<IActionResult> EditUser(UserContact user)
        {
            try
            {
                var users = await _userService.EditUser(user);
                return Ok(users);
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }

        }
    }
}
