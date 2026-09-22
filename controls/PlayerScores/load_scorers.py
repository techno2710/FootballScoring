import pandas as pd
import time
import json
from pathlib import Path
import keyboard 

CONFIG_FILE = "config.json"


paused = False

def toggle_pause():
    global paused
    paused = not paused
    state = "⏸ PAUSIERT" if paused else "▶️ AKTIV"
    print(f"[HOTKEY] Skript ist jetzt: {state}")

keyboard.add_hotkey("ctrl+alt+shift+5", toggle_pause)

print("Skript gestartet")
print("Hotkey: STRG + ALT + UMSCHALT + 5 → Pause / Resume")


def load_config():
    with open(CONFIG_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def main():
    config = load_config()

    base_output = Path(config["outputFolder"])
    scorers_file = base_output / "generated" / "table-players.csv"
    scorers_file.parent.mkdir(parents=True, exist_ok=True)

    external_tables = config.get("externalTables", [])

    interval = config.get("interval", 2)

    while True:

        if paused:
            time.sleep(0.2)
            continue

        try:

            df = pd.read_csv(config["inputFile"])

            required_columns = ["Spielername", "Mannschaftsname", "Toranzahl"]
            for col in required_columns:
                if col not in df.columns:
                    raise ValueError(f"Spalte fehlt: {col}")

            df["Toranzahl"] = (
                pd.to_numeric(df["Toranzahl"], errors="coerce")
                .fillna(0)
                .astype(int)
            )

            df = df.sort_values("Toranzahl", ascending=False)

            export_df = df[["Spielername", "Mannschaftsname", "Toranzahl"]]

            export_df.to_csv(
                scorers_file,
                index=False,
                encoding="utf-8"
            )

            print("Updated: generated/table-players.csv")


            for table in external_tables:
                try:
                    target_path = base_output / table["path"]
                    target_path.parent.mkdir(parents=True, exist_ok=True)

                    table_df = pd.read_csv(table["url"])

                    table_df.to_csv(
                        target_path,
                        index=False,
                        encoding="utf-8"
                    )

                    print(f"Updated: {table['path']}")

                except Exception as e:
                    print(f"Error updating {table.get('name', 'unknown')}: {e}")

        except Exception as e:
            print("Main loop error:", e)

        time.sleep(interval)

if __name__ == "__main__":
    main()