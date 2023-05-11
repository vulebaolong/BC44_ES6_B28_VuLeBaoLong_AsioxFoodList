const foodList = {
    create: function () {},
    read: function () {
        return axios.get("https://645ca39ae01ac610588ecdf2.mockapi.io/food");
    },
    update: function () {},
    delete: function (id) {
        return axios.delete("https://645ca39ae01ac610588ecdf2.mockapi.io/food/" + id);
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
                    <td>${el.type}</td>
                    <td>${el.price}</td>
                    <td>${el.discount}</td>
                    <td>${el.discountPrice}</td>
                    <td>${el.status}</td>
                    <td>
                        <button id="delete" data-id="${el.id}" data-nhi="nhi" data-long="abc" class="btn btn-dark">xóa</button>
                        <button id="edit" data-id="${el.id}" class="btn btn-danger">sửa</button>
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
    //edit nhi làm thêm
};

export default foodList;
