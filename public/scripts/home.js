const destinationBrief = {
  "wine":{
		"discription"	:	"對酒當歌，人生幾何？",
  },
  "cookies":{
		"discription"	:	"我們有超過150款曲奇供你享用",
	},
	"shampoo":{
		"discription"	:	"選擇適當洗髮護髮產品，呵護你的頭髮",
	},
	"pasta":{
		"discription"	:	"美味意粉，人生滿足",
	},
}

const product_discription = document.getElementById("product-discription")

const carouselCategories = document.getElementById("carouselCategories")

if (carouselCategories != null) {
	carouselCategories.addEventListener("slid.bs.carousel", event => {
		product_discription.textContent=destinationBrief[`${event.relatedTarget.id}`]["discription"]
	})
}
