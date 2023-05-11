import Food from "../models/food-list_models.js";
import foodList from "../controllers/food-list_control.js";

foodList.init();

// lắng nghe thẻ cha #tbodyFood để áp dụng tip kế thừa sự kiện
// khi thẻ chả được click sẽ có event (event là obj chứa thông tin người dùng click trúng)
// từ event chấm tới target, chấm tới id để lấy id đã thiết lập === delete thì mới xử lý (phân biệt giữa các thẻ con)
// dataset.id là data tự set bên thẻ html (data-id="nhinhinhinhi")
document.querySelector("#tbodyFood").addEventListener("click", function (event) {
    if (event.target.id === "delete") {
        // console.dir(event.target);
        const id = event.target.dataset.id;
        // console.dir(event.target.dataset.id);
        // console.log("đây là delete");
        foodList.clickDelete(id);
    }
    if (event.target.id === "edit") {
        // console.dir(event.target);
        console.dir(event.target.dataset.id);
        console.log("đây là edit");
    }
});
