export type UserRole = "customer" | "admin";

export type AuthUser = {
  id: string;
  name: string;
  email: string;
  role: UserRole;
};

type StoredUser = AuthUser & {
  password: string;
  createdAt: string;
};

const USERS_KEY = "luxora-users";
const CURRENT_USER_KEY = "luxora-current-user";

const isBrowser = () => typeof window !== "undefined";

const getStoredUsers = (): StoredUser[] => {
  if (!isBrowser()) {
    return [];
  }

  try {
    const users = localStorage.getItem(USERS_KEY);

    if (!users) {
      return [];
    }

    return JSON.parse(users) as StoredUser[];
  } catch {
    return [];
  }
};

export const registerUser = (
  name: string,
  email: string,
  password: string
): { success: boolean; message: string; user?: AuthUser } => {
  if (!isBrowser()) {
    return {
      success: false,
      message: "Authentication is only available in the browser.",
    };
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanName || !cleanEmail || !password) {
    return {
      success: false,
      message: "Please fill in all fields.",
    };
  }

  if (cleanName.length < 3) {
    return {
      success: false,
      message: "Name must be at least 3 characters.",
    };
  }

  if (!cleanEmail.includes("@")) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters.",
    };
  }

  const users = getStoredUsers();

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === cleanEmail
  );

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const newUser: StoredUser = {
    id: crypto.randomUUID(),
    name: cleanName,
    email: cleanEmail,
    password,
    role: "customer",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify([...users, newUser])
  );

  const authUser: AuthUser = {
    id: newUser.id,
    name: newUser.name,
    email: newUser.email,
    role: newUser.role,
  };

  return {
    success: true,
    message: "Account created successfully.",
    user: authUser,
  };
};

export const loginUser = (
  email: string,
  password: string
): { success: boolean; message: string; user?: AuthUser } => {
  if (!isBrowser()) {
    return {
      success: false,
      message: "Authentication is only available in the browser.",
    };
  }

  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    return {
      success: false,
      message: "Please enter your email and password.",
    };
  }

  const users = getStoredUsers();

  const user = users.find(
    (item) =>
      item.email.toLowerCase() === cleanEmail &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  const currentUser: AuthUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role ?? "customer",
  };

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(currentUser)
  );

  return {
    success: true,
    message: "Login successful.",
    user: currentUser,
  };
};

export const getCurrentUser = (): AuthUser | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const currentUser = localStorage.getItem(CURRENT_USER_KEY);

    if (!currentUser) {
      return null;
    }

    const user = JSON.parse(currentUser) as Partial<AuthUser>;

    if (!user.id || !user.name || !user.email) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role ?? "customer",
    };
  } catch {
    return null;
  }
};

export const logoutUser = (): void => {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(CURRENT_USER_KEY);
};

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();

  return user?.role === "admin";
};
export const createAdminUser = (
  name: string,
  email: string,
  password: string
): { success: boolean; message: string; user?: AuthUser } => {
  if (!isBrowser()) {
    return {
      success: false,
      message: "Authentication is only available in the browser.",
    };
  }

  const cleanName = name.trim();
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanName || !cleanEmail || !password) {
    return {
      success: false,
      message: "Please fill in all fields.",
    };
  }

  if (password.length < 6) {
    return {
      success: false,
      message: "Password must be at least 6 characters.",
    };
  }

  const users = getStoredUsers();

  const existingUser = users.find(
    (user) => user.email.toLowerCase() === cleanEmail
  );

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const newAdmin: StoredUser = {
    id: crypto.randomUUID(),
    name: cleanName,
    email: cleanEmail,
    password,
    role: "admin",
    createdAt: new Date().toISOString(),
  };

  localStorage.setItem(
    USERS_KEY,
    JSON.stringify([...users, newAdmin])
  );

  const adminUser: AuthUser = {
    id: newAdmin.id,
    name: newAdmin.name,
    email: newAdmin.email,
    role: newAdmin.role,
  };

  return {
    success: true,
    message: "Admin account created successfully.",
    user: adminUser,
  };
};