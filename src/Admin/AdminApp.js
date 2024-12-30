import { ColorModeContext, useMode } from "./theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { MyProSidebarProvider } from "./pages/global/sidebar/sidebarContext";
import SalesHistory from "./pages/Products/SalesHistory.jsx";
import Topbar from "./pages/global/Topbar";

import Dashboard from "./pages/dashboard/index.jsx";
import SellersClass from "./pages/Profiles/SellersClass";
import UsersDash from "./pages/Profiles/UsersDash";

// products
import ProductClass from "./pages/Products/ProductClass";

import Category from "./pages/Products/Category";

//profile list

import SellerProductSubmission from "./pages/List_Profile_at_once/SellerProductSubmission.jsx";
// import AddUser from "./pages/Add Profiles/AddUser";

// order

import UserList2 from "./pages/List_Profile_at_once/UserList2";
import Userdetails from "./pages/ProfileDetailes/Userdetails";
import ActiveUsers from "./pages/Status Profiles/UserActive";
import BanUsers from "./pages/Status Profiles/UserBan";

import Banner from "./pages/Banner/Banner";
import SubCategory from "./pages/Products/SubCategory";
import AddCategoryModal from "./pages/Models/AddCategoryModal ";
import AddSubCategoryModal from "./pages/Models/AddSubCategoryModal ";
import TimberListingsTable2 from "./pages/Products/TimberListingsTable2.jsx";
import AddSeller from "./pages/Add Profiles/AddSeller.jsx";
import ProfileUpdateForm from "./pages/Settings Changes/ProfileUpdateForm.jsx";
import UserEnquiry from "./pages/Product Enquiry/UserEnquiry.jsx";
import UserEnquiryDone from "./pages/Product Enquiry/UserEnquiryDone.jsx";
import UserEnquiryPending from "./pages/Product Enquiry/UserEnquiryPending.jsx";
import UserEnquiryDetails from "./pages/Product Enquiry/UserEnquiryDetails.jsx";
import BuyersDetails from "./pages/Details/BuyersDetails.jsx";
import ProductDetails from "./pages/Details/ProductDetails.jsx";
import HideProductsList from "./pages/Products/HideProduct.jsx";
import Units from "./pages/Products/Units.jsx";
// import UserEnquiryPending2 from "./pages/Product Enquiryy/UserEnquiryPending2.jsx";
import UserEnquiryDone2 from "./pages/Product Enquiry/UserEnquiryDone2.jsx";
import ProductEnquiryFromBuyers from "./pages/Product Enquiry/ProductEnquiryFromBuyers.jsx";
import SellerRequest from "./pages/Seller/SellerRequest.jsx";
import GetInTouch from "./pages/Get in Touch/GetInTouch.jsx";
import BuyerList from "./pages/Seller/BuyerList.jsx";
import AddBuyerForm from "./pages/Seller/AddBuyerForm.jsx";
import SellerList from "./pages/Seller/SellerList.jsx";
import AddSellerForm from "./pages/Seller/AddSeller.jsx";
import AdminProductPurchase from "./pages/AdminProductPurchase/AdminProductPurchase .jsx";
import SellerFormEditProduct from "./pages/Seller/SellerEditProductForm.jsx";
import SellerProductDetails from "./pages/Seller/SellerProductDetails.jsx";
import ProductObjects from "./pages/Products/ProductObjects.jsx";
import AddProductObjectForm from "./pages/Products/AddProductObject.jsx";
import EditProductForm from "./pages/Products/EditProductObjectForm.jsx";
import PurchaseHistory from "./pages/PurchaseHistory/PurchaseHistory.jsx";
import PurchaseHistoryPerview from "./pages/PurchaseHistory/PurchaseHistoryPerview.jsx";
import ProductObjectsStock from "./pages/Products/Stock";
import Stock from "./pages/Products/Stock";
import AccountHistory from "./pages/Account History/Account History.jsx";
import CompanyProfile from "./pages/Company Profile/CompanyProfile.jsx";
import InVoiceApp from "./Invoice/InvoiceApp.jsx";
import SalesHistroyBill from "./pages/Products/SalesHistorybill.jsx";
import { DownloadInvoice } from "./pages/Products/SalesHistoryBill2.jsx";
import SalesHistroyBillThree from "./pages/Products/SalesHistoryBill3.jsx";
import EnquiryFormEdit from "./pages/Product Enquiry/EnquiryFormEdit.jsx";
import EditBuyerForm from "./pages/Seller/EditBuyerForm.jsx";
import EditSellerForm from "./pages/Seller/EditSellerForm.jsx";
import PurchaseHistoryForm from "./pages/Products/AddPurchaseHistory.jsx";
import AddCategory from "./pages/Products/AddACategory.jsx";
import EditCategory from "./pages/Products/EditACategory.jsx";
import AddSubcategory from "./pages/Products/AddASubcategory.jsx";
import EditSubcategory from "./pages/Products/EditASubcategory.jsx";
import AddUnit from "./pages/Products/AddAUnit.jsx";
import EditPurchaseHistory from "./pages/Products/EditAPurchaseHistory.jsx";
import AddSalesHistory from "./pages/Products/AddASalesHistory.jsx";
import EditWebsiteDetails from "./pages/Company Profile/EditWebsiteDetails.jsx";
import EditProduct from "./pages/Products/EditAProductObject.jsx";

const AdminApp = () => {

  const [theme, colorMode] = useMode();

  return (

    <ColorModeContext.Provider value={colorMode}>

      <ThemeProvider theme={theme}>

        <CssBaseline />

        

        <MyProSidebarProvider>

          <div style={{ height: "100%", width: "100%", overflowX: "hidden" }}>

            
              <Topbar />

              <Routes>
                <Route exact path="/" element={<Dashboard />} />
                <Route path="/sellers" element={<SellersClass />} />
                <Route path="/users" element={<UsersDash />} />
                <Route exact path="/usersListall" element={<UserList2 />} />

                <Route
                  exact
                  path="/sellerslist"
                  element={<SellerProductSubmission />}
                />

                {/* Products */}

                <Route exact path="/Product" element={<ProductClass />} />

                <Route
                  exact
                  path="/productslist"
                  element={<TimberListingsTable2 />}
                />

                <Route exact path="/category" element={<Category />} />
                <Route exact path="/addacategory" element={<AddCategory />} />
                <Route exact path="/editacategory/:id" element={<EditCategory />} />
                <Route exact path="/subcategory" element={<SubCategory />} />
                <Route exact path="/addasubcategory" element={<AddSubcategory />} />
                <Route exact path="/editasubcategory/:id" element={<EditSubcategory />} />
                <Route
                  exact
                  path="/addcategory"
                  element={<AddCategoryModal />}
                />
                <Route
                  exact
                  path="/addsubcategory"
                  element={<AddSubCategoryModal />}
                />

                {/* add Profiles */}

                <Route exact path="/addseller" element={<AddSeller/>} />

                {/*ProFile Details */}
                <Route exact path="/sellerdetail" element={<Userdetails />} />
                <Route
                  exact
                  path="/buyersdetails"
                  element={<BuyersDetails />}
                />

                {/* status of profiles */}
                <Route exact path="/activeusers" element={<ActiveUsers />} />
                <Route exact path="/banusers" element={<BanUsers />} />

                <Route exact path="/banner" element={<Banner />} />
                <Route
                  exact
                  path="/profileupdateform"
                  element={<ProfileUpdateForm />}
                />

                {/* user enquiry components */}
                <Route exact path="/userenquiry" element={<UserEnquiry />} />
                <Route
                  exact
                  path="/buyerenquirydone"
                  element={<UserEnquiryDone />}
                />

                <Route
                  exact
                  path="/userenquirydone2"
                  element={<UserEnquiryDone2 />}
                />
                <Route
                  exact
                  path="/userenquirypending"
                  element={<UserEnquiryPending />}
                />

                {/* <Route
                  exact
                  path="/userenquirypending2"
                  element={<UserEnquiryPending2 />}
                /> */}
                <Route
                  exact
                  path="/userenquirydetails"
                  element={<UserEnquiryDetails />}
                />

                <Route
                  exact
                  path="/productdetails"
                  element={<ProductDetails />}
                />

                <Route exact path="/units" element={<Units />} />
                <Route exact path="/addaunit" element={<AddUnit />} />

                <Route
                  exact
                  path="/hideproductslist"
                  element={<HideProductsList />}
                />

                {/* check urls */}
                <Route
                  exact path="/productenquiryfrombuyers"
                  element={<ProductEnquiryFromBuyers />}
                />
                <Route
                  exact
                  path="/sellerrequest"
                  element={<SellerRequest />}
                />
                <Route exact path="/getintouch" element={<GetInTouch />} />
                <Route exact path="/buyerlist" element={<BuyerList />} />
                <Route exact path="/addbuyerform" element={<AddBuyerForm />} />
                <Route path="/editbuyerform/:id" element={<EditBuyerForm />} /> {/* Route with dynamic ID */}
                <Route exact path="/sellerlist" element={<SellerList />} />
                <Route path="/editsellerform/:id" element={<EditSellerForm />} /> {/* Route with dynamic ID */}
                <Route
                  exact
                  path="/adminproductpurchase"
                  element={<AdminProductPurchase />}
                />
                <Route
                  exact
                  path="/addsellerform"
                  element={<AddSellerForm />}
                />
                <Route
                  exact
                  path="/sellerformeditproduct"
                  element={<SellerFormEditProduct />}
                />
                <Route
                  exact
                  path="/sellerproductdetails"
                  element={<SellerProductDetails />}
                />

                <Route
                  exact
                  path="/productobjects"
                  element={<ProductObjects />}
                />
                                <Route
                  exact
                  path="/editaproductobject/:id"
                  element={<EditProduct />}
                />
                <Route
                  exact
                  path="/addproductobjectform"
                  element={<AddProductObjectForm />}
                />
                <Route
                  exact
                  path="/editproductform"
                  element={<EditProductForm />}
                />
                <Route
                  exact
                  path="/purchasehistory"
                  element={<PurchaseHistory />}
                />
                                <Route
                  exact
                  path="/editapurchasehistory/:id"
                  element={<EditPurchaseHistory />}
                />
                <Route
                  exact
                  path="/addpurchasehistoryform"
                  element={<PurchaseHistoryForm />}
                />
                <Route
                  exact
                  path="/purchasehistoryperview"
                  element={<PurchaseHistoryPerview />}
                />
                <Route exact path="/stock" element={<Stock />} />
                <Route exact path="/saleshistory" element={<SalesHistory />} />
                <Route
                  exact
                  path="/accounthistory"
                  element={<AccountHistory />}
                />

                <Route
                  exact
                  path="/companyprofile"
                  element={<CompanyProfile />}
                />

                  <Route
                  exact
                  path="/editthewebsitedetails"
                  element={<EditWebsiteDetails />}
                />
                <Route exact path="/InVoiceApp" element={<InVoiceApp />} />
                <Route
                  exact
                  path="/SalesHistroyBill"
                  element={<SalesHistroyBill />}
                />
                <Route
                  exact
                  path="/downloadinvoice"
                  element={<DownloadInvoice />}
                />
                <Route
                  exact
                  path="/SalesHistroyBillthree"
                  element={<SalesHistroyBillThree />}
                />
                <Route
                  exact
                  path="/addasaleshistory"
                  element={<AddSalesHistory />}
                />
                <Route
                  exact
                  path="/enquiryformedit"
                  element={<EnquiryFormEdit />}
                />
              </Routes>
            
          </div>

        </MyProSidebarProvider>

        

      </ThemeProvider>

    </ColorModeContext.Provider>
  );
};

export default AdminApp;
