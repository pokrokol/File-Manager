import os from "os";

export const os = async (input) => {
  const secondArg = input.trim().split(" ")[1];

  switch (secondArg) {
    case "--EOL": {
      console.log(`End of line: ${JSON.stringify(os.EOL)}`);
      break;
    }
    case "--cpus": {
      const cpuInfo = {
        "Amount of CPUs": os.cpus().length,
        "Models and clock rates": os.cpus().map((cpu) => ({
          model: cpu.model,
          speed: Math.round(cpu.speed / 100) / 10, // Simplified speed calculation
        })),
      };
      console.log(cpuInfo);
      break;
    }
    case "--homedir": {
      console.log(os.homedir());
      break;
    }
    case "--username": {
      console.log(os.userInfo().username);
      break;
    }
    case "--architecture": {
      console.log(process.arch);
      break;
    }
    case "--platform": {
      console.log(os.platform());
      break;
    }
    case "--release": {
      console.log(os.release());
      break;
    }
    default: {
      console.log("Invalid argument");
      break;
    }
  }
};
