import Food from "../models/food-list_models.js";
import foodList from "../controllers/food-list_control.js";

foodList.init();

// lắng nghe thẻ cha #tbodyFood để áp dụng tip kế thừa sự kiện
// khi thẻ chả được click sẽ có event (event là obj chứa thông tin người dùng click trúng)
// từ event chấm tới target, chấm tới id để lấy id đã thiết lập === delete thì mới xử lý (phân biệt giữa các thẻ con)
// dataset.id là data tự set bên thẻ html (data-id="nhinhinhinhi")
document.querySelector("#tbodyFood").addEventListener("click", function (event) {
    if (event.target.id === "delete") {
        const id = event.target.dataset.id;
        foodList.clickDelete(id);
    }
    if (event.target.id === "edit") {
        const id = event.target.dataset.id;
        foodList.clickEdit(id);
    }
});

document.querySelector("#btnCapNhat").addEventListener("click", function () {
    foodList.clickUpdate();
});

document.querySelector("#selLoai").addEventListener("change", (event) => {
    foodList.sortData(event.target.value);
});

document.querySelector("#input_search").addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        const value = document.querySelector("#input_search").value;
        foodList.searchName(value);
    }
});

document.querySelector("#btnThem").addEventListener("click", () => {
    document.querySelector("#btnCapNhat").disabled = true;
    document.querySelector("#btnThemMon").disabled = false;
    foodList.resetForm();
});

document.querySelector("#btnThemMon").addEventListener("click", () => {
    foodList.clickAdd();
});
