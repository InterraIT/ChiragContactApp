using CMS_API.Modal;

namespace CMS_API.Interfaces
{
    public interface IUserService
    {
        public Task<List<UserContact>> GetUsers();

        public Task<bool> PostUser(UserContact user);

        public Task<bool> DeleteUser(int id);

        public Task<bool> EditUser(UserContact user);
    }
}
