using CMS_API.Interfaces;
using CMS_API.Modal;
using System.Text.Json;

namespace CMS_API.Services
{
    public class UserService :IUserService
    {
        private readonly IWebHostEnvironment _webHostEnvironment;

        public string fileName = "user.json";

        public UserService(IWebHostEnvironment webHostEnvironment)
        {
            _webHostEnvironment = webHostEnvironment;
        }

        public async Task<List<UserContact>> GetUsers()
        {
            try
            {
                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, fileName);

                if (!File.Exists(filePath))
                    return new List<UserContact>();

                var json = File.ReadAllText(filePath);

                List<UserContact> UserContact = JsonSerializer.Deserialize<IEnumerable<UserContact>>(json).ToList();

                return UserContact;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }

        public async Task<bool> PostUser(UserContact user)
        {
            try
            {

                List<UserContact> UserContact = await GetUsers();

                user.id = GetMaxIncUserId();
                UserContact.Add(user);

                bool success = await WriteUsersToJsonAsync(UserContact);

                return success;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }
            
        }


        public async Task<bool> EditUser(UserContact user)
        {
            try
            {
                List<UserContact> UserContact = await GetUsers(); ;

                UserContact userToUpdate = UserContact.FirstOrDefault(userr => userr.id == user.id);

                if (userToUpdate != null)
                {
                    userToUpdate.firstName = user.firstName;
                    userToUpdate.lastName = user.lastName;
                    userToUpdate.email = user.email;
                    bool success = await WriteUsersToJsonAsync(UserContact);
                    return success;
                }

                return false;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public async Task<bool> DeleteUser(int id)
        {
            try
            {
                List<UserContact> UserContact = await GetUsers();

                List<UserContact> updatedList = UserContact.Where(user => user.id != id).ToList();

                bool success = await WriteUsersToJsonAsync(updatedList);

                return success;
            }
            catch (Exception ex)
            {
                throw new Exception(ex.Message);
            }

        }

        public int GetMaxIncUserId()
        {
            var filePath = Path.Combine(_webHostEnvironment.WebRootPath, fileName);

            if (!File.Exists(filePath))
                return 1;

            var json = File.ReadAllText(filePath);

            List<UserContact> users = JsonSerializer.Deserialize<IEnumerable<UserContact>>(json).ToList();

            if (users == null || users.Count == 0)
            {
                return 1;
            }

            int id = users.Max(user => user.id) + 1;

            return id;
        }

        public async Task<bool> WriteUsersToJsonAsync(List<UserContact> users)
        {
            try
            {
                var filePath = Path.Combine(_webHostEnvironment.WebRootPath, fileName);

                var json = JsonSerializer.Serialize(users, new JsonSerializerOptions
                {
                    WriteIndented = true // Optional: Format JSON for readability
                });

                await File.WriteAllTextAsync(filePath, json);

                return true;
            }
            catch (Exception ex)
            {
                return false;
            }
        }
    }
}
