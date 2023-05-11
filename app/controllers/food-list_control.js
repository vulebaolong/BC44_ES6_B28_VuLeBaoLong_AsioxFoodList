const foodList = {
    create: function () {},
    read: function () {
        return axios.get("https://645ca39ae01ac610588ecdf2.mockapi.io/food");
    },
    update: function () {},
    delete: function () {},
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
                        <button class="btn btn-dark">Xóa</button>
                        <button class="btn btn-danger">Delete</button>
                    </td>
                </tr>
            `;
        });
        document.querySelector("#tbodyFood").innerHTML = string;
    },
};

export default foodList;
