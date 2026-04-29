const POST_BUILD_CHECKLIST = [
  {
    "group": "Airframe and printed structure",
    "description": "Inspect the completed frame and structural fasteners.",
    "items": [
      {
        "id": "A1",
        "checkpoint": "Lower-frame stack uses the correct nine M3 × 12 mm round-head screws.",
        "commonErrors": [
          "Missing screw or wrong screw type."
        ]
      },
      {
        "id": "A2",
        "checkpoint": "Upper/lower frame uses the correct fastener set: six M3 × 8 mm screws plus two M3 × 12 mm screws.",
        "commonErrors": [
          "Missing long screws, wrong screw length, missed standoff."
        ]
      },
      {
        "id": "A3",
        "checkpoint": "Frame fasteners are snug without visible overdrive or damage.",
        "commonErrors": [
          "Loose screw, stripped hole, overdriven screw."
        ]
      }
    ]
  },
  {
    "group": "Motor and propeller system",
    "description": "Inspect motor installation, motor-lead exit direction, and final propeller hardware.",
    "items": [
      {
        "id": "M1",
        "checkpoint": "Motor leads exit inward along the arms.",
        "commonErrors": [
          "Leads routed sideways or outward."
        ]
      },
      {
        "id": "M2",
        "checkpoint": "Motors are flat and secured with M3 × 8 mm screws.",
        "commonErrors": [
          "Motor tilted, wrong screw length, missing screw."
        ]
      },
      {
        "id": "M3",
        "checkpoint": "Propellers match the motor spin directions.",
        "commonErrors": [
          "CW/CCW prop swapped; props installed by assumption."
        ]
      },
      {
        "id": "M4",
        "checkpoint": "Propeller lock nuts are snug and no propeller has visible wobble or play.",
        "commonErrors": [
          "Loose nut, mis-seated propeller, visible wobble."
        ]
      }
    ]
  },
  {
    "group": "FC/ESC stack",
    "description": "Inspect the flight-controller and ESC stack, including stack order, isolation, and the FC/ESC interconnect.",
    "items": [
      {
        "id": "F1",
        "checkpoint": "ESC is below the flight controller.",
        "commonErrors": [
          "Stack order reversed."
        ]
      },
      {
        "id": "F2",
        "checkpoint": "Flight controller orientation is correct and USB-C is accessible.",
        "commonErrors": [
          "FC rotated incorrectly."
        ]
      },
      {
        "id": "F3",
        "checkpoint": "ESC orientation is correct.",
        "commonErrors": [
          "ESC rotated or upside down."
        ]
      },
      {
        "id": "F4",
        "checkpoint": "Dampers are seated, intact, and not crushed.",
        "commonErrors": [
          "Damper lip not seated, torn damper, stack overtightened."
        ]
      },
      {
        "id": "F5",
        "checkpoint": "Stack hardware is installed with about two threads protruding below each lock nut.",
        "commonErrors": [
          "Stack too loose, overtightened, missing lock nut."
        ]
      },
      {
        "id": "F6",
        "checkpoint": "FC/ESC cable ends are not swapped: JST-SH to ESC and JST-GH to FC.",
        "commonErrors": [
          "Cable ends swapped."
        ]
      },
      {
        "id": "F7",
        "checkpoint": "JST-SH contact orientation is correct and both FC/ESC cable ends are fully seated.",
        "commonErrors": [
          "JST-SH upside down or partially seated connector."
        ]
      }
    ]
  },
  {
    "group": "Power system and battery retention",
    "description": "Inspect ESC power terminals, XT60 routing, battery pad clearance, and battery restraint.",
    "items": [
      {
        "id": "P1",
        "checkpoint": "Red XT60 ring terminal is connected to ESC positive, and black XT60 ring terminal is connected to ESC negative.",
        "commonErrors": [
          "Polarity reversed."
        ]
      },
      {
        "id": "P2",
        "checkpoint": "XT60 terminal screws are snug; ring terminals do not interfere with the underside JST-SH connector.",
        "commonErrors": [
          "Loose power terminal; ring terminal blocks or contacts connector."
        ]
      },
      {
        "id": "P3",
        "checkpoint": "XT60 lead exits rear, with only the connector extending beyond the rear edge.",
        "commonErrors": [
          "Battery lead exits side/front or excess cable hangs aft."
        ]
      },
      {
        "id": "P4",
        "checkpoint": "XT60 lead is fastened by cable tie.",
        "commonErrors": [
          "Cable tie missing."
        ]
      },
      {
        "id": "P5",
        "checkpoint": "Battery pad cutouts are removed and strap slots remain clear.",
        "commonErrors": [
          "Pad blocks strap slots."
        ]
      },
      {
        "id": "P6",
        "checkpoint": "Battery strap passes through the upper-deck slots and is flat, centered, and accessible; cable tie is present.",
        "commonErrors": [
          "Strap routed around frame, twisted, off-center, or trapped."
        ]
      }
    ]
  },
  {
    "group": "Raspberry Pi and companion computer",
    "description": "Inspect the Raspberry Pi mount, carrier-board soldering, orientation, and fastening.",
    "items": [
      {
        "id": "R1",
        "checkpoint": "Raspberry Pi mount arrow faces up.",
        "commonErrors": [
          "Mount upside down."
        ]
      },
      {
        "id": "R2",
        "checkpoint": "Raspberry Pi mount arrow faces forward.",
        "commonErrors": [
          "Mount backward."
        ]
      },
      {
        "id": "R3",
        "checkpoint": "Front and rear standoffs use the correct screw types.",
        "commonErrors": [
          "Front/rear screws mixed, wrong screw length or type."
        ]
      },
      {
        "id": "R4",
        "checkpoint": "Raspberry Pi mount is fastened to the upper deck with countersunk screws.",
        "commonErrors": [
          "Wrong fastener used."
        ]
      },
      {
        "id": "R5",
        "checkpoint": "Nylon spacers are installed and the Raspberry Pi PCB is not bent.",
        "commonErrors": [
          "Missing spacer or overtightened screws."
        ]
      },
      {
        "id": "R6",
        "checkpoint": "Raspberry Pi orientation is correct.",
        "commonErrors": [
          "Pi mounted backward or on wrong side of mount."
        ]
      },
      {
        "id": "R7",
        "checkpoint": "Molex header and SIP switch orientation are correct.",
        "commonErrors": [
          "Header or switch rotated 180 degrees or installed in wrong footprint."
        ]
      },
      {
        "id": "R8",
        "checkpoint": "Molex header and SIP switch solder joints are not shorted.",
        "commonErrors": [
          "Shorted solder joints."
        ]
      }
    ]
  },
  {
    "group": "Sensor suite",
    "description": "Inspect the GPS, compass, camera, and combined camera/GPS mount.",
    "items": [
      {
        "id": "G1",
        "checkpoint": "GPS/compass module is fully seated.",
        "commonErrors": [
          "GPS shifted or not seated."
        ]
      },
      {
        "id": "G2",
        "checkpoint": "GPS/compass hardware is snug without bending the PCB.",
        "commonErrors": [
          "Loose hardware or overtightened PCB."
        ]
      },
      {
        "id": "G3",
        "checkpoint": "Camera lens is centered and camera PCB sits flat.",
        "commonErrors": [
          "Lens offset, lens blocked, PCB tilted."
        ]
      },
      {
        "id": "G4",
        "checkpoint": "Camera film removed.",
        "commonErrors": [
          "Film left on lens."
        ]
      },
      {
        "id": "G5",
        "checkpoint": "Camera orientation is correct.",
        "commonErrors": [
          "Camera rotated or backward."
        ]
      },
      {
        "id": "G6",
        "checkpoint": "Camera ribbon cable connector is closed.",
        "commonErrors": [
          "Cable unsecured, retainer open or damaged."
        ]
      },
      {
        "id": "G7",
        "checkpoint": "Camera/GPS mount orientation is correct and mount hardware is secure.",
        "commonErrors": [
          "Mount backward, missing standoff, missing screw, wrong screw length."
        ]
      }
    ]
  },
  {
    "group": "Harnesses, connectors, and cable routing",
    "description": "Inspect connector seating, ribbon-cable orientation, cable routing, and propeller-arc clearance.",
    "items": [
      {
        "id": "W1",
        "checkpoint": "Motor connectors are fully seated.",
        "commonErrors": [
          "Partially seated connector or unplugged motor."
        ]
      },
      {
        "id": "W2",
        "checkpoint": "Motor wires are restrained and zip-tie tails are trimmed.",
        "commonErrors": [
          "Loose wire near propeller arc, sharp untrimmed tie tail."
        ]
      },
      {
        "id": "W3",
        "checkpoint": "Camera ribbon is inserted at the camera with contacts facing the correct direction.",
        "commonErrors": [
          "Ribbon reversed or not fully inserted."
        ]
      },
      {
        "id": "W4",
        "checkpoint": "Camera ribbon is inserted at the Raspberry Pi with contacts facing the HDMI port.",
        "commonErrors": [
          "Ribbon reversed or disconnected."
        ]
      },
      {
        "id": "W5",
        "checkpoint": "Raspberry Pi CSI retainer is closed.",
        "commonErrors": [
          "Retainer open or damaged."
        ]
      },
      {
        "id": "W6",
        "checkpoint": "Camera ribbon has a smooth bend with slack.",
        "commonErrors": [
          "Ribbon creased or pulled tight."
        ]
      },
      {
        "id": "W7",
        "checkpoint": "GPS cable is connected to the FC port marked GPS.",
        "commonErrors": [
          "GPS cable in wrong port."
        ]
      },
      {
        "id": "W8",
        "checkpoint": "FC/RPi cable is connected to the FC port marked TELEM.",
        "commonErrors": [
          "TELEM cable in wrong port."
        ]
      },
      {
        "id": "W9",
        "checkpoint": "GPS and FC/RPi cables are routed under the Raspberry Pi and are not pinched.",
        "commonErrors": [
          "Cable routed over top, through snag area, or pinched under mount."
        ]
      },
      {
        "id": "W10",
        "checkpoint": "No wiring enters any propeller arc.",
        "commonErrors": [
          "Loose cable near motor or propeller."
        ]
      }
    ]
  }
];

function checklistEscape(value) {
  return String(value).replace(/[&<>"']/g, ch => ({"&":"&amp;","<":"&lt;",">":"&gt;","\"":"&quot;","'":"&#39;"}[ch]));
}

function renderPostBuildChecklist() {
  const root = document.querySelector('[data-post-build-checklist]');
  if (!root) return;

  const totalItems = POST_BUILD_CHECKLIST.reduce((sum, group) => sum + group.items.length, 0);
  const summary = document.querySelector('[data-post-build-checklist-summary]');
  if (summary) {
    summary.textContent = `${POST_BUILD_CHECKLIST.length} subsystem groups, ${totalItems} checkpoints.`;
  }

  root.innerHTML = POST_BUILD_CHECKLIST.map((group, groupIndex) => {
    const rows = group.items.map(item => {
      const errors = (item.commonErrors || []).map(error => `<li>${checklistEscape(error)}</li>`).join('');
      return `
        <tr>
          <td class="check-id"><strong>${checklistEscape(item.id)}</strong></td>
          <td>${checklistEscape(item.checkpoint)}</td>
          <!--<td class="check-cell"><label><input type="checkbox" aria-label="Pass ${checklistEscape(item.id)}"></label></td>
          <td class="check-cell"><label><input type="checkbox" aria-label="Fix needed ${checklistEscape(item.id)}"></label></td>-->
          <td><ul class="checklist-error-list">${errors}</ul></td>
        </tr>`;
    }).join('');

    return `
      <details class="checklist-group" ${groupIndex === 0 ? 'open' : ''}>
        <summary>
          <span>${checklistEscape(group.group)}</span>
          <span class="badge">${group.items.length} checks</span>
        </summary>
        <p class="muted">${checklistEscape(group.description)}</p>
        <table class="matrix post-build-table" aria-label="${checklistEscape(group.group)} checklist">
          <thead>
            <tr>
              <th>ID</th>
              <th>Checkpoint</th>
              <!--<th>Pass</th>
              <th>Fix needed</th>-->
              <th>Common errors</th>
            </tr>
          </thead>
          <tbody>${rows}</tbody>
        </table>
      </details>`;
  }).join('');
}

document.addEventListener('DOMContentLoaded', renderPostBuildChecklist);
