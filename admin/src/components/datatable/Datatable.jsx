import "./datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import useFetch from "../../Hooks/useFetch";
import axios from "axios";
import { roomColumns } from "../../datatablesource";

const Datatable = ({columns}) => {
  const location = useLocation();
  const path = location.pathname.split("/")[1];
  const { data, loading, error } = useFetch(`/${path}`);
  const [list, setList] = useState([]);

  useEffect(() => {
    if (data) {
      setList(data);
    }
  }, [data]);
  console.log(list)
  const handleDelete = async (id) => {
    try {
      await axios.delete(`/${path}/${id}`);
      setList(list.filter((item) => item._id !== id));
    } catch (error) {
    }
  };

  const handleDeleteRoom = async (roomId, hotelId) => {
    try {
      await axios.delete(`/${path}/${roomId}/${hotelId}`);
      setList(list.filter((item) => item._id !== roomId));
    } catch (error) {
      // Handle the error
    }
  };
  const actionColumn = [
    {
      field: "action",
      headerName: "Action",
      width: 200,
      renderCell: (params) => {
        return (
          <div className="cellAction">
            <Link to="/users/test" style={{ textDecoration: "none" }}>
              <div className="viewButton">View</div>
            </Link>
            <div
              className="deleteButton"
              onClick={columns===roomColumns?() => handleDeleteRoom(params.row._id, params.row.hotelId):() => handleDelete(params.row._id)}
            >
              Delete
            </div>
          </div>
        );
      },
    },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="datatable">
      <div className="datatableTitle">
        {path}
        <Link to={`/${path}/new`} className="link">
          Add New
        </Link>
      </div>
      {data && (
        <DataGrid
          className="datagrid"
          rows={list}
          columns={columns.concat(actionColumn)}
          pageSize={9}
          rowsPerPageOptions={[9]}
          checkboxSelection
          getRowId={(row) => row._id}
        />
      )}
    </div>
  );
};

export default Datatable;
