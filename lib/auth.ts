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

const MIN_NAME_LENGTH = 3;
const MIN_PASSWORD_LENGTH = 6;

const isBrowser = (): boolean => {
  return typeof window !== "undefined";
};

/* =========================================================
   Helpers
========================================================= */

const isValidEmail = (email: string): boolean => {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

const getStoredUsers = (): StoredUser[] => {
  if (!isBrowser()) {
    return [];
  }

  try {
    const users = localStorage.getItem(USERS_KEY);

    if (!users) {
      return [];
    }

    const parsedUsers = JSON.parse(users);

    if (!Array.isArray(parsedUsers)) {
      return [];
    }

    return parsedUsers as StoredUser[];
  } catch {
    return [];
  }
};

const saveUsers = (users: StoredUser[]): void => {
  if (!isBrowser()) {
    return;
  }

  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const normalizeEmail = (email: string): string => {
  return email.trim().toLowerCase();
};

const createUserId = (): string => {
  if (
    typeof crypto !== "undefined" &&
    typeof crypto.randomUUID === "function"
  ) {
    return crypto.randomUUID();
  }

  return `${Date.now()}-${Math.random()
    .toString(36)
    .slice(2, 10)}`;
};

const toAuthUser = (user: StoredUser): AuthUser => {
  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role === "admin" ? "admin" : "customer",
  };
};

const validateRegistration = (
  name: string,
  email: string,
  password: string
): string | null => {
  if (!name || !email || !password) {
    return "Please fill in all fields.";
  }

  if (name.length < MIN_NAME_LENGTH) {
    return `Name must be at least ${MIN_NAME_LENGTH} characters.`;
  }

  if (!isValidEmail(email)) {
    return "Please enter a valid email address.";
  }

  if (password.length < MIN_PASSWORD_LENGTH) {
    return `Password must be at least ${MIN_PASSWORD_LENGTH} characters.`;
  }

  return null;
};

/* =========================================================
   Register
========================================================= */

export const registerUser = (
  name: string,
  email: string,
  password: string
): {
  success: boolean;
  message: string;
  user?: AuthUser;
} => {
  if (!isBrowser()) {
    return {
      success: false,
      message: "Authentication is only available in the browser.",
    };
  }

  const cleanName = name.trim();
  const cleanEmail = normalizeEmail(email);

  const validationError = validateRegistration(
    cleanName,
    cleanEmail,
    password
  );

  if (validationError) {
    return {
      success: false,
      message: validationError,
    };
  }

  const users = getStoredUsers();

  const existingUser = users.find(
    (user) => normalizeEmail(user.email) === cleanEmail
  );

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const newUser: StoredUser = {
    id: createUserId(),
    name: cleanName,
    email: cleanEmail,
    password,
    role: "customer",
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newUser]);

  const authUser = toAuthUser(newUser);

  return {
    success: true,
    message: "Account created successfully.",
    user: authUser,
  };
};

/* =========================================================
   Login
========================================================= */

export const loginUser = (
  email: string,
  password: string
): {
  success: boolean;
  message: string;
  user?: AuthUser;
} => {
  if (!isBrowser()) {
    return {
      success: false,
      message: "Authentication is only available in the browser.",
    };
  }

  const cleanEmail = normalizeEmail(email);

  if (!cleanEmail || !password) {
    return {
      success: false,
      message: "Please enter your email and password.",
    };
  }

  if (!isValidEmail(cleanEmail)) {
    return {
      success: false,
      message: "Please enter a valid email address.",
    };
  }

  const users = getStoredUsers();

  const user = users.find(
    (item) =>
      normalizeEmail(item.email) === cleanEmail &&
      item.password === password
  );

  if (!user) {
    return {
      success: false,
      message: "Invalid email or password.",
    };
  }

  const currentUser = toAuthUser(user);

  localStorage.setItem(
    CURRENT_USER_KEY,
    JSON.stringify(currentUser)
  );

  window.dispatchEvent(new Event("auth-change"));

  return {
    success: true,
    message: "Login successful.",
    user: currentUser,
  };
};

/* =========================================================
   Current User
========================================================= */

export const getCurrentUser = (): AuthUser | null => {
  if (!isBrowser()) {
    return null;
  }

  try {
    const currentUser = localStorage.getItem(
      CURRENT_USER_KEY
    );

    if (!currentUser) {
      return null;
    }

    const user = JSON.parse(
      currentUser
    ) as Partial<AuthUser>;

    if (
      typeof user.id !== "string" ||
      typeof user.name !== "string" ||
      typeof user.email !== "string"
    ) {
      return null;
    }

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role === "admin" ? "admin" : "customer",
    };
  } catch {
    localStorage.removeItem(CURRENT_USER_KEY);

    return null;
  }
};

/* =========================================================
   Logout
========================================================= */

export const logoutUser = (): void => {
  if (!isBrowser()) {
    return;
  }

  localStorage.removeItem(CURRENT_USER_KEY);

  window.dispatchEvent(new Event("auth-change"));
};

/* =========================================================
   Authentication Checks
========================================================= */

export const isAuthenticated = (): boolean => {
  return getCurrentUser() !== null;
};

export const isAdmin = (): boolean => {
  const user = getCurrentUser();

  return user?.role === "admin";
};

/* =========================================================
   Create Admin
========================================================= */

/*
 * IMPORTANT:
 * This function is suitable for the current frontend/demo
 * architecture only.
 *
 * Since users are stored in localStorage, this is NOT secure
 * authentication and should NOT be used for a real production
 * admin system.
 */

export const createAdminUser = (
  name: string,
  email: string,
  password: string
): {
  success: boolean;
  message: string;
  user?: AuthUser;
} => {
  if (!isBrowser()) {
    return {
      success: false,
      message: "Authentication is only available in the browser.",
    };
  }

  const cleanName = name.trim();
  const cleanEmail = normalizeEmail(email);

  const validationError = validateRegistration(
    cleanName,
    cleanEmail,
    password
  );

  if (validationError) {
    return {
      success: false,
      message: validationError,
    };
  }

  const users = getStoredUsers();

  const existingUser = users.find(
    (user) => normalizeEmail(user.email) === cleanEmail
  );

  if (existingUser) {
    return {
      success: false,
      message: "An account with this email already exists.",
    };
  }

  const newAdmin: StoredUser = {
    id: createUserId(),
    name: cleanName,
    email: cleanEmail,
    password,
    role: "admin",
    createdAt: new Date().toISOString(),
  };

  saveUsers([...users, newAdmin]);

  const adminUser = toAuthUser(newAdmin);

  return {
    success: true,
    message: "Admin account created successfully.",
    user: adminUser,
  };
};