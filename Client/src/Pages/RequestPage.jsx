import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Clock,
  User,
  FileText,
  Calendar,
  Filter,
  Search,
  Download,
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { Badge } from "../components/ui/badge";
import { Avatar, AvatarFallback } from "../components/ui/avatar";
import { motion, AnimatePresence } from "motion/react";
import { toast } from "sonner";
import {
  getUserRequests,
  approveRequest,
  declineRequest,
} from "../API/RequestResourceAPI";
import { useEffect } from "react";
import { useAuth } from "../Hooks/useAuth";

export default function RequestPage() {
  const { user } = useAuth();
  const [requests, setRequests] = useState([]);
  const [filterStatus, setFilterStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const res = await getUserRequests(user._id);
        console.log(res);
        setRequests(res);
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, []);

  const handleApprove = async (requestId) => {
    const request = requests.find(
      (req) => req._id === requestId || req.id === requestId
    );
    if (!request) return;

    try {
      const res = await approveRequest(requestId);
      console.log(res);
      setRequests(
        requests.map((req) =>
          req.id === requestId || req._id === requestId
            ? { ...req, status: "approved" }
            : req
        )
      );
      toast.success(
        `Approved ${request.requestor.name}'s request for "${request.resource.title}"`
      );
    } catch (error) {
      console.error("Error approving request:", error);
    }
  };

  const handleDecline = async (requestId) => {
    const request = requests.find(
      (req) => req._id === requestId || req.id === requestId
    );
    if (!request) return;

    setRequests(
      requests.map((req) =>
        req.id === requestId || req._id === requestId
          ? { ...req, status: "rejected" }
          : req
      )
    );

    try {
      const res = await declineRequest(requestId);
      console.log(res);
      toast.error(
        `Declined ${request.requestor.name}'s request for "${request.resource.title}"`
      );
    } catch (error) {
      console.error("Error declining request:", error);
    }
  };

  const filteredRequests = requests.filter((req) => {
    const matchesStatus = filterStatus === "all" || req.status === filterStatus;
    const matchesSearch =
      searchQuery === "" ||
      req.requestor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.requestor.university
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const pendingCount = requests.filter((r) => r.status === "pending").length;
  const approvedCount = requests.filter((r) => r.status === "approved").length;
  const declinedCount = requests.filter((r) => r.status === "rejected").length;

  const getStatusBadge = (status) => {
    switch (status) {
      case "pending":
        return (
          <Badge className="bg-gradient-to-r from-amber-400 to-orange-500 text-white border-0">
            <Clock className="h-3 w-3 mr-1" />
            Pending
          </Badge>
        );
      case "approved":
        return (
          <Badge className="bg-gradient-to-r from-emerald-400 to-green-500 text-white border-0">
            <CheckCircle className="h-3 w-3 mr-1" />
            Approved
          </Badge>
        );
      case "declined":
        return (
          <Badge className="bg-gradient-to-r from-red-400 to-rose-500 text-white border-0">
            <XCircle className="h-3 w-3 mr-1" />
            Declined
          </Badge>
        );
      default:
        return null;
    }
  };

  const getTypeColor = (type) => {
    switch (type) {
      case "Lecture Slides":
        return "from-blue-400 to-purple-500";
      case "Textbook":
        return "from-purple-400 to-indigo-500";
      case "Past Exam":
        return "from-amber-400 to-orange-500";
      case "Video Course":
        return "from-rose-400 to-pink-500";
      default:
        return "from-gray-400 to-gray-600";
    }
  };

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-indigo-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-br from-purple-500 to-pink-500 p-3 rounded-2xl shadow-lg">
              <Download className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl md:text-5xl font-bold">
                <span className="bg-gradient-to-r from-purple-600 via-pink-500 to-indigo-600 bg-clip-text text-transparent">
                  Resource Requests
                </span>
              </h1>
              <p className="text-lg text-muted-foreground mt-1">
                Manage access requests for your shared resources
              </p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="bg-gradient-to-br from-amber-50 to-orange-50 border-amber-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-amber-700">
                        Pending
                      </p>
                      <p className="text-3xl font-bold text-amber-900">
                        {pendingCount}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-amber-400 to-orange-500 p-3 rounded-xl">
                      <Clock className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="bg-gradient-to-br from-emerald-50 to-green-50 border-emerald-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-emerald-700">
                        Approved
                      </p>
                      <p className="text-3xl font-bold text-emerald-900">
                        {approvedCount}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-emerald-400 to-green-500 p-3 rounded-xl">
                      <CheckCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="bg-gradient-to-br from-red-50 to-rose-50 border-red-200 shadow-md hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-red-700">
                        Declined
                      </p>
                      <p className="text-3xl font-bold text-red-900">
                        {declinedCount}
                      </p>
                    </div>
                    <div className="bg-gradient-to-br from-red-400 to-rose-500 p-3 rounded-xl">
                      <XCircle className="h-6 w-6 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Search and Filters */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="shadow-lg border-0">
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-4">
                  {/* Search */}
                  <div className="relative flex-1">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                    <Input
                      placeholder="Search by requester or resource..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="pl-12 h-12 text-base"
                    />
                  </div>

                  {/* Filter Buttons */}
                  <div className="flex gap-2">
                    <Button
                      variant={filterStatus === "all" ? "default" : "outline"}
                      onClick={() => setFilterStatus("all")}
                      className={
                        filterStatus === "all"
                          ? "bg-gradient-to-r from-purple-500 to-pink-500"
                          : ""
                      }
                    >
                      All
                    </Button>
                    <Button
                      variant={
                        filterStatus === "pending" ? "default" : "outline"
                      }
                      onClick={() => setFilterStatus("pending")}
                      className={
                        filterStatus === "pending"
                          ? "bg-gradient-to-r from-amber-400 to-orange-500"
                          : ""
                      }
                    >
                      <Clock className="h-4 w-4 mr-2" />
                      Pending
                    </Button>
                    <Button
                      variant={
                        filterStatus === "approved" ? "default" : "outline"
                      }
                      onClick={() => setFilterStatus("approved")}
                      className={
                        filterStatus === "approved"
                          ? "bg-gradient-to-r from-emerald-400 to-green-500"
                          : ""
                      }
                    >
                      <CheckCircle className="h-4 w-4 mr-2" />
                      Approved
                    </Button>
                    <Button
                      variant={
                        filterStatus === "declined" ? "default" : "outline"
                      }
                      onClick={() => setFilterStatus("declined")}
                      className={
                        filterStatus === "declined"
                          ? "bg-gradient-to-r from-red-400 to-rose-500"
                          : ""
                      }
                    >
                      <XCircle className="h-4 w-4 mr-2" />
                      Declined
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>

        {/* Requests List */}
        {filteredRequests.length > 0 ? (
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="space-y-4"
          >
            <AnimatePresence mode="popLayout">
              {filteredRequests.map((request) => (
                <motion.div
                  key={request._id}
                  variants={item}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  whileHover={{ y: -2 }}
                  transition={{ duration: 0.2 }}
                >
                  <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
                    <div
                      className={`h-1 bg-gradient-to-r ${getTypeColor(
                        request.resourceType
                      )}`}
                    />
                    <CardContent className="p-6">
                      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
                        {/* Left Section - Requester Info */}
                        <div className="flex items-start gap-4 flex-1">
                          <Avatar className="h-14 w-14 border-2 border-purple-200">
                            <AvatarFallback className="bg-gradient-to-br from-purple-400 to-pink-500 text-white font-semibold text-lg">
                              {request.requestor.name.charAt(0).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>

                          <div className="flex-1 min-w-0">
                            {/* Requester Name and Status */}
                            <div className="flex items-center gap-3 mb-2">
                              <h3 className="font-semibold text-sm">
                                {request.requestor.name}
                              </h3>
                              {getStatusBadge(request.status)}
                            </div>

                            {/* University and Email */}
                            <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground mb-3">
                              <span className="flex items-center gap-1">
                                <User className="h-4 w-4" />
                                {request.requestor.university}
                              </span>
                              <span>•</span>
                              <span>{request.requestor.email}</span>
                            </div>

                            {/* Resource Title */}
                            <div className="bg-muted/50 rounded-lg p-3 mb-3">
                              <div className="flex items-center gap-2 mb-1">
                                <FileText className="h-4 w-4 text-purple-500" />
                                <span className="text-xs font-semibold text-muted-foreground uppercase">
                                  Requested Resource
                                </span>
                              </div>
                              <p className="font-semibold text-foreground">
                                {request.resource.title}
                              </p>
                              <Badge
                                variant="outline"
                                className={`mt-2 bg-gradient-to-r ${getTypeColor(
                                  request.resource.type
                                )} text-white border-0`}
                              >
                                {request.resource.type}
                              </Badge>
                            </div>

                            {/* Timestamp */}
                            <div className="flex items-center gap-1 text-xs text-muted-foreground mt-3">
                              <Calendar className="h-3 w-3" />
                              {request.timestamp}
                            </div>
                          </div>
                        </div>

                        {/* Right Section - Action Buttons */}
                        {request.status === "pending" && (
                          <div className="flex lg:flex-col gap-3 lg:min-w-[140px]">
                            <Button
                              onClick={() => handleApprove(request._id)}
                              className="flex-1 lg:w-full bg-gradient-to-r from-emerald-500 to-green-500 hover:from-emerald-600 hover:to-green-600 shadow-md"
                              size="lg"
                            >
                              <CheckCircle className="h-5 w-5 mr-2" />
                              Approve
                            </Button>
                            <Button
                              onClick={() => handleDecline(request._id)}
                              variant="outline"
                              className="flex-1 lg:w-full border-2 border-red-300 text-red-600 hover:bg-red-50 hover:border-red-400"
                              size="lg"
                            >
                              <XCircle className="h-5 w-5 mr-2" />
                              Decline
                            </Button>
                          </div>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-20"
          >
            <Card className="bg-gradient-to-br from-muted/50 to-muted/30 border-dashed border-2 shadow-lg">
              <CardContent className="p-16">
                <div className="bg-gradient-to-br from-purple-100 to-pink-100 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Download className="h-10 w-10 text-purple-600" />
                </div>
                <h3 className="text-2xl font-bold mb-3">No Requests Found</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  {filterStatus !== "all"
                    ? `You don't have any ${filterStatus} requests`
                    : "You haven't received any resource requests yet"}
                </p>
                {filterStatus !== "all" && (
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setFilterStatus("all")}
                  >
                    View All Requests
                  </Button>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
