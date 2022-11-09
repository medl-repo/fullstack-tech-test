const baseUrl = window.location.origin + "/api";

const main = () => {
  $(document).ready(function () {
    window.history.replaceState({}, null, window.location.origin);

    // Activate tooltip
    $('[data-toggle="tooltip"]').tooltip();

    //load inventory data
    populateTable();

    //load form handlers
    handleAddInventory();
    handleEditInventory();
    handleDeleteInventory();
  });
};

/** add a new inventory record */
const handleAddInventory = () => {
  document.forms["addInventoryForm"].onsubmit = async (event) => {
    const formData = new FormData(event.target);
    const body = Object.fromEntries(formData);
    body.tax = body.tax === "on" ? true : false;
    body.lowStockCount = 10;
    body.isOutOfStock = false;

    await modifyRequest({
      url: `${baseUrl}/inventory`,
      method: "POST",
      payload: body,
    });
  };
};

/** edit an existing inventory record */
const handleEditInventory = () => {
  $("#editInventoryModal").on("show.bs.modal", async function (e) {
    //load the item details into the form
    const itemId = $(e.relatedTarget).data("id");
    const item = await fetchRequest(`/inventory/${itemId}`);

    $(e.currentTarget).find('input[name="productName"]').val(item.productName);

    $(e.currentTarget)
      .find('input[name="totalQuantity"]')
      .val(item.totalQuantity);

    $(e.currentTarget).find('input[name="tax"]').prop("checked", item.tax);

    $(e.currentTarget).find('input[name="price"]').val(item.price);

    //update the record on form submit
    document.forms["editInventoryForm"].onsubmit = async (event) => {
      const formData = new FormData(event.target);
      const body = Object.fromEntries(formData);
      body.tax = body.tax === "on" ? true : false;
      body.lowStockCount = 10;
      body.isOutOfStock = false;

      await modifyRequest({
        url: `${baseUrl}/inventory/${itemId}`,
        method: "PATCH",
        payload: body,
      });
    };
  });
};

/** delete an existing inventory record */
const handleDeleteInventory = () => {
  $("#deleteInventoryModal").on("show.bs.modal", async function (e) {
    const itemId = $(e.relatedTarget).data("id");

    $("#deleteInventoryButton").click(async function () {
      await modifyRequest({
        url: `${baseUrl}/inventory/${itemId}`,
        method: "DELETE",
      });
    });
  });
};

/** get the list of inventories and fill out the table */
const populateTable = () => {
  const table = document.getElementById("myTable");

  fetchRequest("/inventory").then((result) => {
    result.forEach((item) => {
      const row = table.insertRow();
      let cell = row.insertCell();
      cell.innerHTML = item.productName;
      cell = row.insertCell();
      cell.innerHTML = item.totalQuantity;
      cell = row.insertCell();
      cell.innerHTML = item.tax === true ? "Applied" : "Not Applied";
      cell = row.insertCell();
      cell.innerHTML = Intl.NumberFormat("en-us", {
        style: "currency",
        currency: "USD",
      }).format(parseFloat(item.price));

      cell = row.insertCell();
      cell.innerHTML = `
        <td>
            <a 
                href="#editInventoryModal" 
                class="edit" 
                data-toggle="modal" 
                data-id="${item.id}"
            >
                <i
                    class="material-icons"
                    data-toggle="tooltip"
                    title="Edit"
                >
                    &#xE254;
                </i>
            </a>
            <a
                href="#deleteInventoryModal"
                class="delete"
                data-toggle="modal"
                data-id="${item.id}"
            >
                <i
                    class="material-icons"
                    data-toggle="tooltip"
                    title="Delete"
                >
                    &#xE872;
                </i>
            </a>
        </td>
      `;
    });
  });
};

/**
 * perform a GET request on the given endpoint
 * @param {String} endpoint
 * @returns
 */
const fetchRequest = async (endpoint) => {
  const url = baseUrl;

  const response = await fetch(url + endpoint, { method: "GET" });

  try {
    return response.json().then((result) => {
      console.debug({
        message: "GET request success",
        request: url + endpoint,
        result,
      });

      return result;
    });
  } catch (error) {
    console.error({
      message: "GET request failed",
      error,
      response,
      request: url + endpoint,
    });
  }
};

/**
 * perform a **post** | **put** | **delete** request on the given endpoint
 * @param params.url url to hit
 * @param params.payload body content
 * @param params.method http method - defaults to PUT
 * @param params.token optional. user jwt
 * @param params.extraHeaders optional. { [key: string]: string }
 */
const modifyRequest = async (params) => {
  const { url, payload, method = "PUT", token = "", extraHeaders } = params;

  const myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/octet-stream");
  myHeaders.append("Authorization", token);

  if (extraHeaders !== undefined && typeof extraHeaders === "object") {
    Object.keys(extraHeaders).forEach((key) => {
      myHeaders.append(key, extraHeaders[key]);
    });
  }

  return fetch(url, {
    method: method,
    headers: myHeaders,
    body: JSON.stringify(payload),
  })
    .then((response) => {
      console.group(`${method}: medl third party api`);
      console.debug({ request: `${url}`, payload, response });

      //return null for 204's
      if (response.status === 204) {
        console.debug(`warning: server responded with no content`);
        return null;
      }

      if (response.status === 400) {
        return response.text().then((error) => {
          return {
            error: true,
            message: error,
          };
        });
      }

      return response.json();
    })
    .then((result) => {
      if (
        result !== undefined &&
        result !== null &&
        typeof result === "object" &&
        result.error !== undefined
      ) {
        if (result["error"] === true) throw result.message ?? result;
      }
      console.debug({ result });

      console.groupEnd();
      return result;
    })
    .catch((error) => {
      if (error.message !== undefined) {
        if (error.message === "Unexpected token A in JSON at position 0")
          console.error("server responded with empty body/payload");
        else console.error(error.message);
      } else {
        console.error(error);
      }

      console.groupEnd();
      return { message: `failed ${method} request`, error };
    });
};

main();
