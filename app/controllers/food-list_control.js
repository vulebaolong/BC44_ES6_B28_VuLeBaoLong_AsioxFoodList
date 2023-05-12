const foodList = {
    BASE_URL: "https://645ca39ae01ac610588ecdf2.mockapi.io/food/",
    create: function () {},
    read: function () {
        return axios.get(this.BASE_URL);
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
    init: async function () {
        const result = await this.read();
        this.render(result.data);
    },
    render: function (arrData) {
        let string = "";
        arrData.forEach((el) => {
            string += `
                <tr>
                    <td>${el.id}</td>
                    <td>${el.name}</td>
                    <td>${el.type === "loai1" ? "chay" : "mặn"}</td>
                    <td>${el.price}</td>
                    <td>${el.discount}%</td>
                    <td>${el.discountPrice}</td>
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
        await this.delete(id);
        const result = await this.read();
        this.render(result.data);
    },
    clickEdit: async function (idEl) {
        console.log(idEl);
        $("#exampleModal").modal("show");
        const result = await this.readOneItem(idEl);
        console.log(result.data);
        const { id, name, type, price, discount, status, img, description } = result.data;
        this.showDataOnForm(id, name, type, price, discount, status, img, description);
    },
    clickUpdate: async function () {
        const data = this.getDataForm();
        console.log(data);
        const resultUp = await this.update(data.id, data);
        console.log("👙  resultUp: ", resultUp);
        const result = await this.read();
        this.render(result.data);
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
};

export default foodList;
