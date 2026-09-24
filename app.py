from flask import Flask, render_template, request, jsonify
import random

app = Flask(__name__)


# -----------------------------
# HOTEL DATA
# -----------------------------

hotels = [
    {
        "id": 1,
        "name": "Taj Palace",
        "city": "Delhi",
        "type": "Luxury",
        "price": 8500,
        "rooms": 10,
        "rating": 4.8
    },
    {
        "id": 2,
        "name": "ITC Gardenia",
        "city": "Bangalore",
        "type": "Luxury",
        "price": 7500,
        "rooms": 8,
        "rating": 4.7
    },
    {
        "id": 3,
        "name": "Novotel Hyderabad",
        "city": "Hyderabad",
        "type": "Business",
        "price": 4500,
        "rooms": 15,
        "rating": 4.4
    },
    {
        "id": 4,
        "name": "The Leela Palace",
        "city": "Bangalore",
        "type": "Luxury",
        "price": 9500,
        "rooms": 5,
        "rating": 4.9
    },
    {
        "id": 5,
        "name": "Hyatt Regency",
        "city": "Mumbai",
        "type": "Business",
        "price": 6000,
        "rooms": 12,
        "rating": 4.5
    }
]


# -----------------------------
# FOOD DATA
# -----------------------------

foods = [
    {
        "id": 101,
        "name": "Chicken Biryani",
        "restaurant": "Paradise",
        "category": "Biryani",
        "price": 280
    },
    {
        "id": 102,
        "name": "Paneer Butter Masala",
        "restaurant": "Udupi Restaurant",
        "category": "North Indian",
        "price": 220
    },
    {
        "id": 103,
        "name": "Masala Dosa",
        "restaurant": "Saravana Bhavan",
        "category": "South Indian",
        "price": 120
    },
    {
        "id": 104,
        "name": "Veg Biryani",
        "restaurant": "Biryani House",
        "category": "Biryani",
        "price": 200
    },
    {
        "id": 105,
        "name": "Chicken 65",
        "restaurant": "Spice Kitchen",
        "category": "Starters",
        "price": 260
    },
    {
        "id": 106,
        "name": "Margherita Pizza",
        "restaurant": "Pizza Corner",
        "category": "Pizza",
        "price": 350
    }
]


# -----------------------------
# HOME PAGE
# -----------------------------

@app.route("/")
def home():
    return render_template(
        "index.html",
        hotels=hotels,
        foods=foods
    )


# -----------------------------
# SEARCH HOTELS
# -----------------------------

@app.route("/search-hotels", methods=["POST"])
def search_hotels():

    data = request.json

    city = data.get("city", "").strip().lower()

    results = []

    for hotel in hotels:

        if city in hotel["city"].lower():

            results.append(hotel)

    return jsonify(results)


# -----------------------------
# BOOK HOTEL
# -----------------------------

@app.route("/book-hotel", methods=["POST"])
def book_hotel():

    data = request.json

    hotel_id = int(data.get("hotel_id"))
    guest_name = data.get("guest_name")
    rooms = int(data.get("rooms", 1))
    nights = int(data.get("nights", 1))

    hotel = next(
        (h for h in hotels if h["id"] == hotel_id),
        None
    )

    if hotel is None:

        return jsonify({
            "success": False,
            "message": "Hotel not found"
        })

    if rooms <= 0 or nights <= 0:

        return jsonify({
            "success": False,
            "message": "Invalid room or night count"
        })

    if rooms > hotel["rooms"]:

        return jsonify({
            "success": False,
            "message": "Not enough rooms available"
        })

    total = hotel["price"] * rooms * nights

    hotel["rooms"] -= rooms

    booking_id = "HT" + str(
        random.randint(10000, 99999)
    )

    return jsonify({
        "success": True,
        "booking_id": booking_id,
        "guest_name": guest_name,
        "hotel": hotel["name"],
        "city": hotel["city"],
        "rooms": rooms,
        "nights": nights,
        "total": total
    })


# -----------------------------
# SEARCH FOOD
# -----------------------------

@app.route("/search-food", methods=["POST"])
def search_food():

    data = request.json

    keyword = data.get("keyword", "").strip().lower()

    results = []

    for food in foods:

        if (
            keyword in food["name"].lower()
            or keyword in food["restaurant"].lower()
            or keyword in food["category"].lower()
        ):

            results.append(food)

    return jsonify(results)


# -----------------------------
# ORDER FOOD
# -----------------------------

@app.route("/order-food", methods=["POST"])
def order_food():

    data = request.json

    customer_name = data.get("customer_name")
    food_id = int(data.get("food_id"))
    quantity = int(data.get("quantity", 1))

    food = next(
        (f for f in foods if f["id"] == food_id),
        None
    )

    if food is None:

        return jsonify({
            "success": False,
            "message": "Food item not found"
        })

    if quantity <= 0:

        return jsonify({
            "success": False,
            "message": "Invalid quantity"
        })

    total = food["price"] * quantity

    order_id = "FD" + str(
        random.randint(10000, 99999)
    )

    return jsonify({
        "success": True,
        "order_id": order_id,
        "customer_name": customer_name,
        "food": food["name"],
        "restaurant": food["restaurant"],
        "quantity": quantity,
        "total": total
    })


# -----------------------------
# RUN APPLICATION
# -----------------------------

if __name__ == "__main__":

    app.run(
        host="0.0.0.0",
        port=5000,
        debug=True
    )
