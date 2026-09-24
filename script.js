let selectedHotelId = null;
let selectedFoodId = null;


// -----------------------------
// SHOW SECTION
// -----------------------------

function showSection(section) {

    document.getElementById("hotels").style.display = "none";
    document.getElementById("food").style.display = "none";

    document.getElementById(section).style.display = "block";
}


// -----------------------------
// SEARCH HOTELS
// -----------------------------

function searchHotels() {

    const city =
        document.getElementById("city").value;

    fetch("/search-hotels", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            city: city
        })

    })

    .then(response => response.json())

    .then(hotels => {

        const list =
            document.getElementById("hotelList");

        list.innerHTML = "";

        if (hotels.length === 0) {

            list.innerHTML =
                "<p>No hotels found.</p>";

            return;
        }

        hotels.forEach(hotel => {

            list.innerHTML += `

                <div class="card">

                    <div class="card-icon">
                        🏨
                    </div>

                    <h3>
                        ${hotel.name}
                    </h3>

                    <p>
                        📍 ${hotel.city}
                    </p>

                    <p>
                        ⭐ ${hotel.rating}
                    </p>

                    <p>
                        ${hotel.type}
                    </p>

                    <h3 class="price">
                        ₹${hotel.price}
                        <small>/ night</small>
                    </h3>

                    <p>
                        ${hotel.rooms}
                        rooms available
                    </p>

                    <button
                        onclick="openHotelBooking(${hotel.id})">

                        Book Hotel

                    </button>

                </div>
            `;
        });

    });
}


// -----------------------------
// HOTEL BOOKING
// -----------------------------

function openHotelBooking(hotelId) {

    selectedHotelId = hotelId;

    document.getElementById(
        "hotelModal"
    ).style.display = "flex";
}


function closeHotelBooking() {

    document.getElementById(
        "hotelModal"
    ).style.display = "none";
}


function bookHotel() {

    const guestName =
        document.getElementById(
            "guestName"
        ).value;

    const rooms =
        document.getElementById(
            "roomCount"
        ).value;

    const nights =
        document.getElementById(
            "nightCount"
        ).value;

    if (!guestName) {

        alert("Please enter guest name");

        return;
    }

    fetch("/book-hotel", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            hotel_id: selectedHotelId,

            guest_name: guestName,

            rooms: rooms,

            nights: nights

        })

    })

    .then(response => response.json())

    .then(data => {

        const result =
            document.getElementById(
                "hotelResult"
            );

        if (!data.success) {

            result.innerHTML =
                `<p>❌ ${data.message}</p>`;

            return;
        }

        result.innerHTML = `

            <h3>✅ Hotel Booking Confirmed</h3>

            <p>
                <strong>Booking ID:</strong>
                ${data.booking_id}
            </p>

            <p>
                <strong>Guest:</strong>
                ${data.guest_name}
            </p>

            <p>
                <strong>Hotel:</strong>
                ${data.hotel}
            </p>

            <p>
                <strong>City:</strong>
                ${data.city}
            </p>

            <p>
                <strong>Rooms:</strong>
                ${data.rooms}
            </p>

            <p>
                <strong>Nights:</strong>
                ${data.nights}
            </p>

            <p>
                <strong>Total:</strong>
                ₹${data.total}
            </p>
        `;

    });
}


// -----------------------------
// SEARCH FOOD
// -----------------------------

function searchFood() {

    const keyword =
        document.getElementById(
            "foodKeyword"
        ).value;

    fetch("/search-food", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            keyword: keyword
        })

    })

    .then(response => response.json())

    .then(foods => {

        const list =
            document.getElementById(
                "foodList"
            );

        list.innerHTML = "";

        if (foods.length === 0) {

            list.innerHTML =
                "<p>No food items found.</p>";

            return;
        }

        foods.forEach(food => {

            list.innerHTML += `

                <div class="card">

                    <div class="card-icon">
                        🍴
                    </div>

                    <h3>
                        ${food.name}
                    </h3>

                    <p>
                        🏪 ${food.restaurant}
                    </p>

                    <p>
                        ${food.category}
                    </p>

                    <h3 class="price">
                        ₹${food.price}
                    </h3>

                    <button
                        onclick="openFoodOrder(${food.id})">

                        Order Now

                    </button>

                </div>
            `;
        });

    });
}


// -----------------------------
// FOOD ORDER
// -----------------------------

function openFoodOrder(foodId) {

    selectedFoodId = foodId;

    document.getElementById(
        "foodModal"
    ).style.display = "flex";
}


function closeFoodOrder() {

    document.getElementById(
        "foodModal"
    ).style.display = "none";
}


function orderFood() {

    const customerName =
        document.getElementById(
            "customerName"
        ).value;

    const quantity =
        document.getElementById(
            "foodQuantity"
        ).value;

    if (!customerName) {

        alert("Please enter customer name");

        return;
    }

    fetch("/order-food", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({

            customer_name: customerName,

            food_id: selectedFoodId,

            quantity: quantity

        })

    })

    .then(response => response.json())

    .then(data => {

        const result =
            document.getElementById(
                "foodResult"
            );

        if (!data.success) {

            result.innerHTML =
                `<p>❌ ${data.message}</p>`;

            return;
        }

        result.innerHTML = `

            <h3>✅ Order Confirmed</h3>

            <p>
                <strong>Order ID:</strong>
                ${data.order_id}
            </p>

            <p>
                <strong>Customer:</strong>
                ${data.customer_name}
            </p>

            <p>
                <strong>Food:</strong>
                ${data.food}
            </p>

            <p>
                <strong>Restaurant:</strong>
                ${data.restaurant}
            </p>

            <p>
                <strong>Quantity:</strong>
                ${data.quantity}
            </p>

            <p>
                <strong>Total:</strong>
                ₹${data.total}
            </p>
        `;

    });
}


// -----------------------------
// DEFAULT SECTION
// -----------------------------

showSection("hotels");
