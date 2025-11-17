const nomorWA = "6282146212007";

// ===============================
// DATA PRODUK + STOK
// ===============================
const produkList = [
  { 
    nama:"Firetric Korek Api Elektrik Pulse Plasma Cross Double Arc Lighter - JL613-FD", 
    harga:50300, 
    stok:100, 
    gambar:"../tahap1/gambar/gambar produk/Firetric Korek Api Elektrik Pulse Plasma Cross Double Arc Lighter - JL613-FD.jpg", 
    deskripsi:"Warna: Metal" 
  },

  { 
    nama:"TNS Asbak T9224 - Hitam",      // ← diperbaiki
    harga:10000, 
    stok:100, 
    gambar:"../tahap1/gambar/gambar produk/asbak.jpg", 
    deskripsi:"Warna: Hitam" 
  },

  { 
    nama:"Firetric FOCUS Kotak Rokok 20 Slot dengan Korek Elektrik Plasma - JD-YH093", 
    harga:25200, 
    stok:100, 
    gambar:"../tahap1/gambar/gambar produk/firetric-kotak-rokok-20-slot-dengan-korek-elektrik-pyrotechnic-yh093.jpg", 
    deskripsi:"Material: Aluminium & Plastik" 
  },

  { 
    nama:"Firetric Kotak Bungkus Rokok Elegan Aluminium Cigarette Case - YH006", 
    harga:14600, 
    stok:100, 
    gambar:"../tahap1/gambar/gambar produk/firetric-kotak-bungkus-rokok-elegan-aluminium-cigarette-case-yh006.jpg", 
    deskripsi:"Material: Plastik dan Aluminium" 
  },

  { 
    nama:"TNS Asbak T9224 - Silver",    // ← diperbaiki
    harga:8800, 
    stok:100, 
    gambar:"../tahap1/gambar/gambar produk/TNS Asbak Rokok Cigar Ashtray Ash Stainless Steel - T9224.jpg", 
    deskripsi:"Material: Plastik dan Aluminium" 
  },

    { 
    nama:"Firetric Korek Api Gas Butane Torch Jet Windproof - HQ0935", 
    harga:11700
, 
    stok:100, 
    gambar:"../tahap1/gambar/gambar produk/Firetric Korek Api Gas Butane Torch Jet Windproof - HQ0935.jpg", 
    deskripsi:"Material: Tembaga dan Plastik" 
  },

    { 
    nama:"Firetric Asbak Rokok Stainless Steel Windproof Ashtray - HL7 ",    // ← diperbaiki
    harga:12000, 
    stok:100, 
    gambar:"../tahap1/gambar/gambar produk/Firetric Asbak Rokok Stainless Steel Windproof Ashtray - HL7.jpg", 
    deskripsi:"Material: Plastik dan Aluminium" 
  },

    { 
    nama:"Firetric Alat Linting Rokok Otomatis Electric Roller 8x66mm - H011 ",    // ← diperbaiki
    harga:71100, 
    stok:100, 
    gambar:"../tahap1/gambar/gambar produk/Firetric Alat Linting Rokok Otomatis Electric Roller 8x66mm - H011.jpg", 
    deskripsi:"Material: Plastik dan Aluminium" 
  },

    { 
    nama:"PEIXING Asbak Rokok Portable Rotation Enclosed Stainless Steel 1 PCS - JL032 ",    // ← diperbaiki
    harga:6000, 
    stok:100, 
    gambar:"../tahap1/gambar/gambar produk/PEIXING Asbak Rokok Portable Rotation Enclosed Stainless Steel 1 PCS - JL032.jpg", 
    deskripsi:"Material: Plastik dan Aluminium" 
  },

      { 
    nama:"Firetric Gantungan Kunci Pemantik Api Minyak Tanah Waterproof - A1243",    // ← diperbaiki
    harga:3900, 
    stok:100, 
    gambar:"../tahap1/gambar/gambar produk/Firetric Gantungan Kunci Pemantik Api Minyak Tanah Waterproof - A1243.jpg", 
    deskripsi:"Material: Plastik dan Aluminium" 
  },
];

let cart = [];
const container = document.getElementById("product-list");

function updateCartCount(){ 
  document.getElementById("cart-count").textContent = cart.length; 
}

// ===============================
// TAMBAH KE KERANJANG + KURANGI STOK
// ===============================
function addToCart(nama,harga){
  const produk = produkList.find(p => p.nama === nama);

  if (produk.stok <= 0) {
    alert("Stok habis!");
    return;
  }

  produk.stok--; // KURANGI STOK SAAT DITAMBAHKAN

  const exist = cart.find(p => p.nama === nama);

  if (exist) {
    exist.qty++;
  } else {
    cart.push({ nama, harga, qty: 1 });
  }

  updateCartCount();
  renderProduk();
  renderCart();
}

// ===============================
// RENDER PRODUK (ADA STOK)
// ===============================
function renderProduk(){
  container.innerHTML = "";

  produkList.forEach(p=>{
    container.innerHTML += `
      <div class="product-card">
        <img src="${p.gambar}" alt="${p.nama}">
        <div class="product-info">
          <h3>${p.nama}</h3>
          <p class="desc">${p.deskripsi}</p>
          <p class="price">Rp${p.harga.toLocaleString()}</p>
          <p class="stok">Stok: <b>${p.stok}</b></p>

          ${
            p.stok > 0
            ? `<button class="add-cart-btn" onclick="addToCart('${p.nama}',${p.harga})">+ Keranjang</button>`
            : `<button class="add-cart-btn" style="background:#999;cursor:not-allowed;">Stok Habis</button>`
          }
        </div>
      </div>`;
  });
}
renderProduk();

// ===============================
// PANEL KERANJANG
// ===============================
document.getElementById("cart-float").onclick = ()=>{
  document.getElementById("cart-panel").style.display="flex"; 
  renderCart();
};
document.getElementById("close-cart").onclick = ()=>{
  document.getElementById("cart-panel").style.display="none";
};

// ===============================
// RENDER KERANJANG
// ===============================
function renderCart(){
  const panel = document.getElementById("cart-items");
  panel.innerHTML = "";
  let total = 0;

  cart.forEach((item,i)=>{
    total += item.harga * item.qty;

    panel.innerHTML += `
      <div class="cart-item">
        <div>
          <b>${item.nama}</b><br>
          Rp${item.harga.toLocaleString()}
        </div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="changeQty(${i},-1)">-</button>
          ${item.qty}
          <button class="qty-btn" onclick="changeQty(${i},1)">+</button>
          <button class="remove-btn" onclick="removeItem(${i})">✖</button>
        </div>
      </div>`;
  });

  document.getElementById("cart-total").textContent = total.toLocaleString();
}

// ===============================
// UBAH JUMLAH BARANG + UPDATE STOK
// ===============================
function changeQty(i,val){
  const item = cart[i];
  const produk = produkList.find(p => p.nama === item.nama);

  // Jika tambah qty
  if (val === 1) {
    if (produk.stok <= 0) {
      alert("Stok tidak cukup!");
      return;
    }
    item.qty++;
    produk.stok--;
  }

  // Jika kurangi qty
  if (val === -1) {
    item.qty--;
    produk.stok++;
    if (item.qty <= 0) cart.splice(i,1);
  }

  updateCartCount();
  renderProduk();
  renderCart();
}

// ===============================
// HAPUS ITEM (STOK KEMBALI)
// ===============================
function removeItem(i){
  const item = cart[i];
  const produk = produkList.find(p => p.nama === item.nama);

  produk.stok += item.qty; // KEMBALIKAN STOK

  cart.splice(i,1);

  updateCartCount();
  renderProduk();
  renderCart();
}

// ===============================
// CHECKOUT KE WHATSAPP
// ===============================
document.getElementById("checkout").onclick = ()=>{
  if(cart.length===0){
    alert("Keranjang masih kosong!");
    return;
  }
  document.getElementById("cart-panel").style.display="none";
  document.getElementById("alamat-panel").style.display="flex";
};

document.getElementById("close-alamat").onclick = ()=>{
  document.getElementById("alamat-panel").style.display="none";
};

document.getElementById("confirm-alamat").addEventListener("click", () => {
  const alamat = document.getElementById("alamat-input").value.trim();
  const jenisOngkir = document.getElementById("jenis-ongkir").value.trim();
  const kurir = document.getElementById("kurir").value;
  const payment = document.getElementById("payment").value;

  if (!alamat) return alert("Alamat wajib diisi!");
  if (!jenisOngkir) return alert("Jenis ongkir wajib diisi!");

  let text = "*🛒 PESANAN BARU*\n\n";
  text += "*Daftar Produk:*\n";

  let totalBarang = 0;

  cart.forEach((item, i) => {
    const subtotal = item.harga * item.qty;
    totalBarang += subtotal;
    text += `${i + 1}. ${item.nama} — ${item.qty}x\n   Rp${subtotal.toLocaleString()}\n`;
  });

  text += `\n*Total Barang:* Rp${totalBarang.toLocaleString()}`;
  text += `\n*Ongkir:* ${kurir} (${jenisOngkir}) — _(admin akan infokan)_`;
  text += `\n*Total Pembayaran:* Rp${totalBarang.toLocaleString()}`;
  text += `\n\n*Alamat:* ${alamat}`;
  text += `\n*Kurir:* ${kurir}`;
  text += `\n*Pembayaran:* ${payment}`;
  text += `\n\nMohon diproses ya 😊`;

  const waText = encodeURIComponent(text);
  window.open(`https://wa.me/${nomorWA}?text=${waText}`, "_blank");

  document.getElementById("alamat-panel").style.display = "none";
});
