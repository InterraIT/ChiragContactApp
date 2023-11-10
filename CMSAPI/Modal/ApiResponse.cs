namespace CMS_API.Modal
{
    public class ApiResponse<T>
    {
        public int page { get; set; }
        public int totalCount { get; set; }
        public T Data { get; set; }

        public ApiResponse(int page, int totalCount, T data)
        {
            this.page = page;
            this.totalCount = totalCount;
            this.Data = data;
        }
    }
}
