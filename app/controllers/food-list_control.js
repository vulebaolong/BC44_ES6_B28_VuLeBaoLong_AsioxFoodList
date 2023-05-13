import Food from "../models/food-list_models.js";

const foodList = {
    arrData: [],
    BASE_URL: "https://645ca39ae01ac610588ecdf2.mockapi.io/food/",
    create: function (item) {
        return axios.post(this.BASE_URL, item);
    },
    read: async function () {
        const result = await axios.get(this.BASE_URL);
        this.arrData = result.data;
        return result;
    },
    readOneItem: function (id) {
        return axios.get(this.BASE_URL + id);
    },
    update: function (id, data) {
        return axios.put(this.BASE_URL + id, data);
    },
    delete: function (id) {
        return axios.delete(this.BASE_URL + id);
    },
    search: async function (name) {
        const result = await axios.get(this.BASE_URL, {
            params: {
                name: name,
            },
        });
        this.arrData = result.data;
        return result;
    },
    init: async function () {
        this.loading("on");
        const result = await this.read();
        this.render(result.data);
        this.loading("off");
    },
    render: function (data) {
        let string = "";
        data.reverse().forEach((el) => {
            // console.log(+el.price, +el.discount / 100, +el.price * (+el.discount / 100));
            const discountPrice = this.formatCurrency(
                Math.round(+el.price * (+el.discount / 100))
            );
            string += `
                <tr>
                    <td>${el.id}</td>
                    <td>${el.name}</td>
                    <td>${el.type === "loai1" ? "chay" : "mặn"}</td>
                    <td>${this.formatCurrency(el.price)} vnđ</td>
                    <td>${el.discount}%</td>
                    <td>${discountPrice} vnđ</td>
                    <td>${el.status === "0" ? "hết" : "còn"}</td>
                    <td>
                        <button id="delete" data-id="${
                            el.id
                        }" data-nhi="nhi" data-long="abc" class="btn btn-dark">xóa</button>
                        <button id="edit" data-id="${
                            el.id
                        }" class="btn btn-danger">sửa</button>
                    </td>
                </tr>
            `;
        });
        document.querySelector("#tbodyFood").innerHTML = string;
    },
    clickDelete: async function (id) {
        this.loading("on");
        await this.delete(id);
        const result = await this.read();
        this.render(result.data);
        this.loading("off");
    },
    clickEdit: function (idEl) {
        console.log(idEl);
        $("#exampleModal").modal("show");
        document.querySelector("#btnCapNhat").disabled = false;
        document.querySelector("#btnThemMon").disabled = true;
        const data = this.arrData.find(function (item) {
            return item.id === idEl;
        });
        const { id, name, type, price, discount, status, img, description } = data;
        this.showDataOnForm(id, name, type, price, discount, status, img, description);
    },
    clickUpdate: async function () {
        const data = this.getDataForm();
        this.loading("on");
        await this.update(data.id, data);
        const result = await this.read();
        this.render(result.data);
        $("#exampleModal").modal("hide");
        this.loading("off");
    },
    showDataOnForm: function (id, name, type, price, discount, status, img, description) {
        document.querySelector("#foodID").value = id;
        document.querySelector("#tenMon").value = name;
        document.querySelector("#loai").value = type;
        document.querySelector("#giaMon").value = price;
        document.querySelector("#khuyenMai").value = discount;
        document.querySelector("#tinhTrang").value = status;
        document.querySelector("#hinhMon").value = img;
        document.querySelector("#moTa").value = description;
    },
    getDataForm: function () {
        const id = document.querySelector("#foodID").value;
        const name = document.querySelector("#tenMon").value;
        const type = document.querySelector("#loai").value;
        const price = document.querySelector("#giaMon").value;
        const discount = document.querySelector("#khuyenMai").value;
        const status = document.querySelector("#tinhTrang").value;
        const img = document.querySelector("#hinhMon").value;
        const description = document.querySelector("#moTa").value;
        return { id, name, type, price, discount, status, img, description };
    },
    sortData: function (type) {
        if (type === "all" || type === "Chọn loại") {
            this.render(this.arrData);
            return;
        }
        const result = this.arrData.filter(function (item) {
            return item.type === type;
        });
        this.render(result);
    },
    searchName: async function (name) {
        this.loading("on");
        const result = await this.search(name);
        console.log(result);
        this.render(result.data);
        this.loading("off");
    },
    clickAdd: async function () {
        const data = this.getDataForm();
        const { id, name, type, price, discount, status, img, description } = data;
        const dataNew = new Food(
            id,
            name,
            type,
            price,
            discount,
            status,
            img,
            description
        );
        this.loading("on");
        await this.create(dataNew);
        const result = await this.read();
        this.render(result.data);
        $("#exampleModal").modal("hide");
        this.loading("off");
    },
    formatCurrency: function (num, locale = navigator.language) {
        return new Intl.NumberFormat(locale).format(num);
    },
    loading: function (flag) {
        if (flag === "off") {
            document.querySelector(".spinner_modal").classList.add("hide_spinner");
        }

        if (flag === "on") {
            document.querySelector(".spinner_modal").classList.remove("hide_spinner");
        }
    },
};

export default foodList;
