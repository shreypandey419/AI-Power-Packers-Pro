import { useEffect, useState, useCallback } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import DashboardCards from "../components/admin/DashboardCards";
import LeadCharts from "../components/admin/LeadCharts";
import FilterBar from "../components/admin/FilterBar";
import LeadTable from "../components/admin/LeadTable";
import Pagination from "../components/admin/Pagination";
import EditLeadModal from "../components/admin/EditLeadModal";
import QuotationModal from "../components/forms/QuotationModal";
import DashboardOverview from "../components/admin/DashboardOverview";
import LeadDetailsDrawer from "../components/admin/LeadDetailsDrawer";
import StatsCards from "../components/admin/StatsCards";
import { getDashboardStats } from "../services/adminDashboardService";
import NotificationBell from "../components/admin/NotificationBell";
import RevenueChart from "../components/admin/RevenueChart";
import API_URL from "../config/api";


export default function Admin() {

  const [leads, setLeads] = useState([]);

  const [search, setSearch] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedLead, setSelectedLead] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const [quoteLead, setQuoteLead] = useState(null);
  const [showQuoteModal, setShowQuoteModal] = useState(false);

  const [showDrawer, setShowDrawer] = useState(false);
  const [drawerLead, setDrawerLead] = useState(null);

  const navigate = useNavigate();

  const [stats, setStats] = useState(null);

  const fetchLeads = useCallback(async (currentPage) => {
    try {

      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${API_URL}/api/leads?page=${currentPage}&limit=10&search=${encodeURIComponent(
          search
        )}&status=${status}&priority=${priority}&sort=${sort}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setLeads(res.data.leads);
      setPage(res.data.page);
      setTotalPages(res.data.totalPages);

    } catch (err) {

      console.log(err);

      toast.error("Failed to load leads");

    }

  }, [search, status, priority, sort]);

  const fetchDashboard = async () => {
    try {

      const res = await getDashboardStats();

      setStats(res);

    } catch (err) {

      console.log(err);

    }
  };

  useEffect(() => {
    fetchLeads(page);
    fetchDashboard();
  }, [page, fetchLeads]);

  useEffect(() => {
    document.title = "My Bookings | PackersPro";
  }, []);

  const updateStatus = async (id, status) => {

    try {

      const token = localStorage.getItem("adminToken");

      await axios.put(
        `${API_URL}/api/leads/${id}/status`,
        { status },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Status Updated");

      fetchLeads(page);

    } catch (err) {

      console.log(err);

      toast.error("Update Failed");

    }

  };

  const deleteLead = async (id) => {

    if (!window.confirm("Delete this lead?")) return;

    try {

      const token = localStorage.getItem("adminToken");

      await axios.delete(
        `${API_URL}/api/leads/${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.success("Lead Deleted");

      fetchLeads(page);

    } catch (err) {

      console.log(err);

      toast.error("Delete Failed");

    }

  };

  const openEditModal = (lead) => {
    setSelectedLead(lead);
    setShowModal(true);
  };

  const openDrawer = (lead) => {
  console.log("VIEW CLICKED", lead);

  setDrawerLead(lead);
  setShowDrawer(true);
};

  const openQuoteModal = (lead) => {
    setQuoteLead(lead);
    setShowQuoteModal(true);
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    window.location.href = "/admin/login";
  };

  const exportExcel = async () => {

    try {

      const token = localStorage.getItem("adminToken");

      const res = await axios.get(
        `${API_URL}/api/leads/export/excel`,
        {
          responseType: "blob",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const url = window.URL.createObjectURL(
        new Blob([res.data])
      );

      const link = document.createElement("a");

      link.href = url;
      link.download = "Leads.xlsx";

      document.body.appendChild(link);

      link.click();

      link.remove();

      toast.success("Excel Download Started");

    } catch (err) {

      console.log(err);

      toast.error("Excel Export Failed");

    }

  };
    return (
    <div className="min-h-screen bg-gray-100">

      <div className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-center gap-6 mb-8">

          <h1 className="text-4xl font-bold">
            Admin Dashboard
          </h1>

          <div className="flex flex-wrap gap-3 w-full lg:w-auto">

            <button
              onClick={exportExcel}
              className="flex-1 sm:flex-none bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg whitespace-nowrap">
                Export Excel
            </button>

            <button
              onClick={() => navigate("/admin/bookings")}
              className="flex-1 sm:flex-none bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg whitespace-nowrap"
            >
              Manage Bookings
            </button>

            <button
              onClick={() => navigate("/admin/reviews")}
              className="flex-1 sm:flex-none bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg whitespace-nowrap">
              Customer Reviews
            </button>

            <div className="flex items-center justify-center">
              <NotificationBell />
            </div>

            <button
              onClick={logout}
              className="flex-1 sm:flex-none bg-red-600 hover:bg-red-700 text-white px-5 py-3 rounded-lg whitespace-nowrap"
            >
              Logout
            </button>

          </div>

        </div>

        <DashboardCards />
        
        {stats && <StatsCards stats={stats} />}

        <RevenueChart />

        <LeadCharts leads={leads} />

        <DashboardOverview />

        <FilterBar
          search={search}
          setSearch={setSearch}
          status={status}
          setStatus={setStatus}
          priority={priority}
          setPriority={setPriority}
          sort={sort}
          setSort={setSort}
          setPage={setPage}
        />

        <LeadTable
          leads={leads}
          updateStatus={updateStatus}
          openEditModal={openEditModal}
          openDrawer={openDrawer}
          openQuoteModal={openQuoteModal}
          deleteLead={deleteLead}
        />
        <LeadDetailsDrawer
          lead={drawerLead}
          open={showDrawer}
          onClose={() => setShowDrawer(false)}
          onEdit={(lead) => {
            setShowDrawer(false);
            openEditModal(lead);
          }}
          onQuote={(lead) => {
            setShowDrawer(false);
            openQuoteModal(lead);
          } }
        />

        <Pagination
          page={page}
          totalPages={totalPages}
          setPage={setPage}
        />

      </div>

      {showModal && selectedLead && (
        <EditLeadModal
          lead={selectedLead}
          onClose={() => setShowModal(false)}
          onUpdated={() => {
            fetchLeads(page);
            setShowModal(false);
          }}
        />
      )}

      {showQuoteModal && quoteLead && (
        <QuotationModal
          lead={quoteLead}
          onClose={() => setShowQuoteModal(false)}
        />
      )}

    </div>
  );
}