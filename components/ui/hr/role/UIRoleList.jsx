"use client";
import React from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Input,
  Button,
  DropdownTrigger,
  Dropdown,
  DropdownMenu,
  DropdownItem,
  Chip,
  Pagination,
} from "@heroui/react";
import { Search, ChevronDown, EllipsisVertical, Plus } from "lucide-react";

export const columns = [
  { name: "ID", uid: "id", sortable: true },
  { name: "NAME", uid: "name", sortable: true },
  { name: "STATUS", uid: "status", sortable: true },
  { name: "OPERATED By", uid: "creator" },
  { name: "ACTIONS", uid: "actions" },
];

export const statusOptions = [
  { name: "Active", uid: "active" },
  { name: "InActive", uid: "inactive" },
];

export function capitalize(s) {
  return s ? s.charAt(0).toUpperCase() + s.slice(1).toLowerCase() : "";
}

const statusColorMap = {
  active: "success",
  inactive: "danger",
};

const INITIAL_VISIBLE_COLUMNS = ["name", "creator", "status", "actions"];

export default function UIRoleList() {
  const [filterValue, setFilterValue] = React.useState("");
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([]));
  const [visibleColumns, setVisibleColumns] = React.useState(
    new Set(INITIAL_VISIBLE_COLUMNS)
  );
  const [statusFilter, setStatusFilter] = React.useState("all");
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [sortDescriptor, setSortDescriptor] = React.useState({
    column: "id",
    direction: "ascending",
  });
  const [page, setPage] = React.useState(1);
  const [users, setUsers] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const hasSearchFilter = Boolean(filterValue);

  React.useEffect(() => {
    async function fetchRoles() {
      try {
        const res = await fetch("/api/hr/role", {
          headers: {
            "secret-token": process.env.NEXT_PUBLIC_SECRET_TOKEN || "",
          },
        });
        const json = await res.json();
        if (res.ok && json.role) {
          const mapped = json.role.map((r) => ({
            id: r.roleId,
            name: r.roleName,
            creator: `${r.RoleCreateBy?.empFirstNameTH || ""} ${
              r.RoleCreateBy?.empLastNameTH || ""
            }`.trim(),
            createAt: r.roleCreateAt || null,
            updateBy: `${r.RoleUpdateBy?.empFirstNameTH || "-"} ${
              r.RoleUpdateBy?.empLastNameTH || ""
            }`.trim(),
            updateAt: r.roleUpdateAt || null,
            status: r.roleStatus?.toLowerCase() || "active",
          }));
          setUsers(mapped);
        } else {
          console.error(json.error || "Failed to load roles");
        }
      } catch (err) {
        console.error("Error loading roles", err);
      } finally {
        setIsLoading(false);
      }
    }

    fetchRoles();
  }, []);

  const headerColumns = React.useMemo(() => {
    if (visibleColumns === "all") return columns;
    return columns.filter((column) =>
      Array.from(visibleColumns).includes(column.uid)
    );
  }, [visibleColumns]);

  const filteredItems = React.useMemo(() => {
    let filteredUsers = [...users];
    if (hasSearchFilter) {
      filteredUsers = filteredUsers.filter((user) =>
        user.name.toLowerCase().includes(filterValue.toLowerCase())
      );
    }
    if (
      statusFilter !== "all" &&
      Array.from(statusFilter).length !== statusOptions.length
    ) {
      filteredUsers = filteredUsers.filter((user) =>
        Array.from(statusFilter).includes(user.status)
      );
    }
    return filteredUsers;
  }, [users, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage) || 1;

  const items = React.useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      const first = a[sortDescriptor.column];
      const second = b[sortDescriptor.column];
      const cmp = first < second ? -1 : first > second ? 1 : 0;
      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const formatDateTime = (d) =>
    d
      ? new Date(d).toLocaleString("th-TH", {
          day: "2-digit",
          month: "2-digit",
          year: "numeric",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        })
      : "-";

  const renderCell = React.useCallback((user, columnKey) => {
    const cellValue = user[columnKey];
    switch (columnKey) {
      case "name":
        return <p className="text-bold text-small">{cellValue}</p>;
      case "creator":
        return (
          <div className="flex flex-col text-sm leading-snug">
            <div>
              <span className="font-[600]">Created By:</span>
              <br />
              <div className="pl-4">
                {user.creator || "-"} ({formatDateTime(user.createAt)})
              </div>
            </div>

            <div>
              <span className="font-[600]">Updated By:</span>
              <br />
              <div className="pl-4">
                {user.updateBy || "-"} ({formatDateTime(user.updateAt)})
              </div>
            </div>
          </div>
        );
      case "status":
        return (
          <Chip
            className="w-full h-full rounded-full p-3"
            color={statusColorMap[user.status]}
            variant="flat"
          >
            {capitalize(cellValue)}
          </Chip>
        );
      case "actions":
        return (
          <div className="relative flex justify-end items-center gap-2">
            <Dropdown>
              <DropdownTrigger>
                <Button
                  isIconOnly
                  color="default"
                  className="aspect-square rounded-full p-3"
                >
                  <EllipsisVertical />
                </Button>
              </DropdownTrigger>
              <DropdownMenu>
                <DropdownItem key="edit">Edit</DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </div>
        );
      default:
        return cellValue;
    }
  }, []);

  const onNextPage = () => page < pages && setPage(page + 1);
  const onPreviousPage = () => page > 1 && setPage(page - 1);
  const onRowsPerPageChange = (e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  };
  const onSearchChange = (value) => {
    setFilterValue(value);
    setPage(1);
  };
  const onClear = () => {
    setFilterValue("");
    setPage(1);
  };

  const topContent = (
    <div className="flex flex-col items-center justify-center w-full gap-2">
      <div className="flex flex-row items-center justify-center w-full h-full p-2 gap-2">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2">
          <Input
            isClearable
            placeholder="Search by name..."
            className="w-8/12"
            startContent={<Search />}
            value={filterValue}
            onClear={onClear}
            onValueChange={onSearchChange}
          />
        </div>
        <div className="xl:flex hidden items-center justify-center h-full p-2 gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                color="default"
                className="p-3 gap-2"
                endContent={<ChevronDown />}
              >
                Status
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectedKeys={statusFilter}
              selectionMode="multiple"
              onSelectionChange={setStatusFilter}
            >
              {statusOptions.map((status) => (
                <DropdownItem key={status.uid} className="capitalize">
                  {capitalize(status.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="xl:flex hidden items-center justify-center h-full p-2 gap-2">
          <Dropdown>
            <DropdownTrigger>
              <Button
                color="default"
                className="p-3 gap-2"
                endContent={<ChevronDown />}
              >
                Columns
              </Button>
            </DropdownTrigger>
            <DropdownMenu
              disallowEmptySelection
              closeOnSelect={false}
              selectedKeys={visibleColumns}
              selectionMode="multiple"
              onSelectionChange={setVisibleColumns}
            >
              {columns.map((column) => (
                <DropdownItem key={column.uid} className="capitalize">
                  {capitalize(column.name)}
                </DropdownItem>
              ))}
            </DropdownMenu>
          </Dropdown>
        </div>
        <div className="flex items-center justify-center h-full p-2 gap-2">
          <Button
            asChild
            color="primary"
            className="flex items-center justify-center p-3 gap-2"
            endContent={<Plus />}
          >
            <Link href="/hr/role/create">Add New</Link>
          </Button>
        </div>
      </div>
      <div className="flex flex-row items-center justify-between w-full h-full p-2 gap-2">
        <div className="flex items-center justify-start w-full h-full p-2 gap-2">
          Total {users.length} users
        </div>
        <div className="flex items-center justify-end w-full h-full p-2 gap-2">
          Rows per page:
          <select className="p-2" onChange={onRowsPerPageChange}>
            <option value="5">5</option>
            <option value="10">10</option>
            <option value="15">15</option>
          </select>
        </div>
      </div>
    </div>
  );

  const bottomContent = (
    <div className="flex flex-row items-center justify-center w-full p-2 gap-2">
      <div className="flex items-center justify-start w-full h-full p-2 gap-2">
        {selectedKeys === "all"
          ? "All items selected"
          : `${selectedKeys.size} of ${filteredItems.length} selected`}
      </div>
      <Pagination
        isCompact
        showControls
        showShadow
        color="primary"
        className="w-full"
        page={page}
        total={pages}
        onChange={setPage}
      />
      <div className="xl:flex hidden items-center justify-end w-full h-full p-2 gap-2">
        <Button
          isDisabled={pages === 1}
          color="primary"
          onPress={onPreviousPage}
        >
          Previous
        </Button>
        <Button isDisabled={pages === 1} color="primary" onPress={onNextPage}>
          Next
        </Button>
      </div>
    </div>
  );

  return (
    <div className="flex flex-col items-center justify-between w-full h-full p-2 gap-2 bg-white rounded-2xl shadow-md overflow-auto">
      <Table
        isHeaderSticky
        shadow="none"
        aria-label="Role table"
        bottomContent={bottomContent}
        bottomContentPlacement="outside"
        classNames={{ wrapper: "w-full h-full" }}
        selectedKeys={selectedKeys}
        selectionMode="multiple"
        sortDescriptor={sortDescriptor}
        topContent={topContent}
        topContentPlacement="outside"
        onSelectionChange={setSelectedKeys}
        onSortChange={setSortDescriptor}
      >
        <TableHeader columns={headerColumns}>
          {(column) => (
            <TableColumn
              key={column.uid}
              align={column.uid === "actions" ? "center" : "start"}
              allowsSorting={column.sortable}
            >
              {column.name}
            </TableColumn>
          )}
        </TableHeader>
        {isLoading ? (
          <TableBody emptyContent={"Loading..."} items={[]}>
            <TableRow>
              {(column) => <TableCell key={column.uid}>Loading...</TableCell>}
            </TableRow>
          </TableBody>
        ) : (
          <TableBody emptyContent={"No Roles found"} items={sortedItems}>
            {(item) => (
              <TableRow key={item.id}>
                {(columnKey) => (
                  <TableCell>{renderCell(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
    </div>
  );
}
